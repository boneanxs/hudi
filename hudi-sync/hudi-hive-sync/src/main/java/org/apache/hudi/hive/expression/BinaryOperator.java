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

package org.apache.hudi.hive.expression;

import java.util.Arrays;

/**
 * The expression that accept two child expressions.
 */
public abstract class BinaryOperator extends Expression {

  private final Operator operator;
  private final Expression left;
  private final Expression right;

  public BinaryOperator(Expression left, Operator operator, Expression right) {
    super(Arrays.asList(left, right));
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  public Operator getOperator() {
    return operator;
  }

  public Expression getLeft() {
    return left;
  }

  public Expression getRight() {
    return right;
  }

  public abstract static class BinaryComparator extends BinaryOperator {

    public BinaryComparator(Expression left, Operator operator, Expression right) {
      super(left, operator, right);
    }

    @Override
    public <T> T accept(ExpressionVisitor<T> exprVisitor) {
      return exprVisitor.visitBinaryComparator(getLeft(), getOperator(), getRight());
    }
  }

  public static class Or extends BinaryOperator {

    public Or(Expression left, Expression right) {
      super(left, Operator.OR, right);
    }

    @Override
    public <T> T accept(ExpressionVisitor<T> exprVisitor) {
      return exprVisitor.visitOr(this.getLeft(), this.getRight());
    }
  }

  public static class And extends BinaryOperator {

    public And(Expression left, Expression right) {
      super(left, Operator.AND, right);
    }

    @Override
    public <T> T accept(ExpressionVisitor<T> exprVisitor) {
      return exprVisitor.visitAnd(this.getLeft(), this.getRight());
    }
  }

  public static class EqualTo extends BinaryComparator {

    public EqualTo(Expression left, Expression right) {
      super(left, Operator.EQ, right);
    }
  }

  public static class GreatThanOrEqual extends BinaryComparator {

    public GreatThanOrEqual(Expression left, Expression right) {
      super(left, Operator.GT_EQ, right);
    }
  }

  public static class LessThanOrEqual extends BinaryComparator {

    public LessThanOrEqual(Expression left, Expression right) {
      super(left, Operator.LT_EQ, right);
    }
  }
}
