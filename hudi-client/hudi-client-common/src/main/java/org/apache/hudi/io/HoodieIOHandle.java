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

package org.apache.hudi.io;

import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.StringUtils;
import org.apache.hudi.config.HoodieWriteConfig;
import org.apache.hudi.exception.HoodieIOException;
import org.apache.hudi.table.HoodieTable;

import org.apache.hadoop.fs.FileSystem;

import java.util.Iterator;

public abstract class HoodieIOHandle<T, I, K, O> {

  protected final String instantTime;
  protected final HoodieWriteConfig config;
  protected final FileSystem fs;
  protected final HoodieTable<T, I, K, O> hoodieTable;

  HoodieIOHandle(HoodieWriteConfig config, Option<String> instantTime, HoodieTable<T, I, K, O> hoodieTable) {
    this.instantTime = instantTime.orElse(StringUtils.EMPTY_STRING);
    this.config = config;
    this.hoodieTable = hoodieTable;
    this.fs = getFileSystem();
  }

  public abstract FileSystem getFileSystem();

  protected final void stopIfAborted() {
    if (hoodieTable.getTaskContextSupplier().isAborted()) {
      throw new HoodieIOException("The task is already aborted, stop handling new records...");
    }
  }

  protected final <V> Iterator<V> interruptibleIterator(Iterator<V> iterator) {
    return new Iterator<V>() {
      @Override
      public boolean hasNext() {
        stopIfAborted();
        return iterator.hasNext();
      }

      @Override
      public V next() {
        return iterator.next();
      }
    };
  }
}
