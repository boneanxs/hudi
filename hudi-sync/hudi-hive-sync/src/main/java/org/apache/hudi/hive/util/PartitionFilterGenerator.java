/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.hudi.hive.util;

import org.apache.hudi.common.util.ReflectionUtils;
import org.apache.hudi.hive.HiveSyncConfig;
import org.apache.hudi.hive.HoodieHiveSyncException;
import org.apache.hudi.hive.expression.BinaryOperator;
import org.apache.hudi.hive.expression.Expression;
import org.apache.hudi.hive.expression.LeafExpression;
import org.apache.hudi.sync.common.model.FieldSchema;
import org.apache.hudi.sync.common.model.Partition;
import org.apache.hudi.sync.common.model.PartitionValueExtractor;

import java.util.Arrays;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.apache.hudi.hive.HiveSyncConfig.HIVE_SYNC_FILTER_PUSHDOWN_MAX_SIZE;
import static org.apache.hudi.sync.common.HoodieSyncConfig.META_SYNC_PARTITION_EXTRACTOR_CLASS;

public class PartitionFilterGenerator {

  private interface ExpressionBuilder<T> {

    /**
     * Visit all elements provided to build the expression tree.
     */
    Expression visitAll(List<T> allElements);

    /**
     * Visit sub element to build the sub expression.
     */
    Expression visitElement(T element);
  }

  /**
   * Build expression from the Partition list.
   *
   * ex. partitionSchema(date, hour) [Partition(2022-09-01, 12), Partition(2022-09-02, 13)] =>
   *     Or(And(Equal(Attribute(date), Literal(2022-09-01)), Equal(Attribute(hour), Literal(12))),
   *     And(Equal(Attribute(date), Literal(2022-09-02)), Equal(Attribute(hour), Literal(13))))
   */
  private static class PartitionExpressionBuilder implements ExpressionBuilder<Partition> {

    private final List<FieldSchema> partitionFields;

    public PartitionExpressionBuilder(List<FieldSchema> partitionFields) {
      this.partitionFields = partitionFields;
    }

    @Override
    public Expression visitElement(Partition partition) {
      List<String> partitionValues = partition.getValues();

      Expression root = null;
      for (int i = 0; i < partitionFields.size(); i++) {
        FieldSchema field = partitionFields.get(i);
        String value = partitionValues.get(i);
        BinaryOperator.EqualTo exp = new BinaryOperator.EqualTo(new LeafExpression.AttributeReferenceExpression(field.getName()),
            new LeafExpression.Literal(value, field.getType()));
        if (root != null) {
          root = new BinaryOperator.And(root, exp);
        } else {
          root = exp;
        }
      }
      return root;
    }

    @Override
    public Expression visitAll(List<Partition> partitions) {
      Expression root = null;

      for (Partition partition : partitions) {
        Expression exp = visitElement(partition);
        if (root != null) {
          root = new BinaryOperator.Or(root, exp);
        } else {
          root = exp;
        }
      }

      return root;
    }
  }

  /**
   * Build expression from {@link PartitionField}, this builder will extract the min value
   * and the max value of each field, and construct GreatThanOrEqual and LessThanOrEqual to
   * build the expression.
   *
   * This builder can reduce the Expression tree level a lot if each field has too many values.
   */
  private static class MinMaxPartitionExpressionBuilder implements ExpressionBuilder<PartitionField> {

    public MinMaxPartitionExpressionBuilder() {}

    @Override
    public Expression visitAll(List<PartitionField> fieldValues) {
      Expression root = null;
      for (PartitionField values : fieldValues) {
        Expression exp = visitElement(values);
        if (root != null) {
          root = new BinaryOperator.And(root, exp);
        } else {
          root = exp;
        }
      }

      return root;
    }

    private static class ValueComparator implements Comparator<String> {

      private final String valueType;
      public ValueComparator(String type) {
        this.valueType = type;
      }

      @Override
      public int compare(String s1, String s2) {
        switch (valueType.toLowerCase(Locale.ROOT)) {
          case HiveSchemaUtil.INT_TYPE_NAME:
            int i1 = Integer.parseInt(s1);
            int i2 = Integer.parseInt(s2);
            return i1 - i2;
          case HiveSchemaUtil.BIGINT_TYPE_NAME:
            long l1 = Long.parseLong(s1);
            long l2 = Long.parseLong(s2);
            long result = l1 - l2;
            if (result > 0) {
              return 1;
            }

            if (result < 0) {
              return -1;
            }

            return 0;
          default:
            return s1.compareTo(s2);
        }
      }
    }

    @Override
    public Expression visitElement(PartitionField partitionField) {
      if (partitionField.values.length == 1) {
        return new BinaryOperator.EqualTo(new LeafExpression.AttributeReferenceExpression(partitionField.field.getName()),
            new LeafExpression.Literal(partitionField.values[0], partitionField.field.getType()));
      }
      Arrays.sort(partitionField.values, new ValueComparator(partitionField.field.getType()));
      return new BinaryOperator.And(
          new BinaryOperator.GreatThanOrEqual(
              new LeafExpression.AttributeReferenceExpression(partitionField.field.getName()),
              new LeafExpression.Literal(partitionField.values[0], partitionField.field.getType())),
          new BinaryOperator.LessThanOrEqual(
              new LeafExpression.AttributeReferenceExpression(partitionField.field.getName()),
              new LeafExpression.Literal(partitionField.values[partitionField.values.length - 1], partitionField.field.getType())));
    }
  }

  private static class PartitionField {
    protected final FieldSchema field;
    protected final String[] values;

    public PartitionField(FieldSchema field, String[] values) {
      this.field = field;
      this.values = values;
    }
  }

  public static String generatePushDownFilter(List<String> writtenPartitions, List<FieldSchema> partitionFields, HiveSyncConfig config) {
    PartitionValueExtractor partitionValueExtractor = ReflectionUtils
        .loadClass(config.getStringOrDefault(META_SYNC_PARTITION_EXTRACTOR_CLASS));

    List<Partition> partitions = writtenPartitions.stream().map(s -> {
      List<String> values = partitionValueExtractor.extractPartitionValuesInPath(s);

      if (values.size() != partitionFields.size()) {
        throw new HoodieHiveSyncException("Partition fields and values should be same length"
            + ", but got partitionFields: " + partitionFields + " with values: " + values);
      }

      return new Partition(values, null);
    }).collect(Collectors.toList());

    Expression filter;
    int estimateSize = partitionFields.size() * partitions.size();
    if (estimateSize > config.getIntOrDefault(HIVE_SYNC_FILTER_PUSHDOWN_MAX_SIZE)) {
      List<PartitionField> fieldWithValuesList = IntStream.range(0, partitionFields.size())
          .mapToObj(i -> {
            Set<String> values = new HashSet<String>();
            for (int j = 0; j < partitions.size(); j++) {
              values.add(partitions.get(j).getValues().get(i));
            }
            return new PartitionField(partitionFields.get(i), values.toArray(new String[0]));
          })
          .collect(Collectors.toList());
      filter = new MinMaxPartitionExpressionBuilder().visitAll(fieldWithValuesList);
    } else {
      filter = new PartitionExpressionBuilder(partitionFields).visitAll(partitions);
    }

    return generateFilterString(filter);
  }

  private static String generateFilterString(Expression filter) {
    return filter.accept(new FilterGenVisitor());
  }
}
