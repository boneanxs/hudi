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

package org.apache.hudi.io.storage;

import org.apache.hadoop.fs.Path;
import org.apache.hudi.common.fs.FSUtils;
import org.apache.hudi.common.fs.HoodieWrapperFileSystem;
import org.apache.parquet.hadoop.ParquetFileWriter;
import org.apache.parquet.hadoop.ParquetWriter;
import org.apache.parquet.hadoop.api.WriteSupport;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Base class of Hudi's custom {@link ParquetWriter} implementations
 *
 * @param <R> target type of the object being written into Parquet files (for ex,
 *           {@code IndexedRecord}, {@code InternalRow})
 */
public abstract class HoodieBaseParquetWriter<R> extends ParquetWriter<R> {

  private final AtomicLong writtenRecordCount = new AtomicLong(0);
  private final long maxFileSize;
  private long recordNumForNextCheck = 100;

  public HoodieBaseParquetWriter(Path file,
                                 HoodieParquetConfig<? extends WriteSupport<R>> parquetConfig) throws IOException {
    super(HoodieWrapperFileSystem.convertToHoodiePath(file, parquetConfig.getHadoopConf()),
        ParquetFileWriter.Mode.CREATE,
        parquetConfig.getWriteSupport(),
        parquetConfig.getCompressionCodecName(),
        parquetConfig.getBlockSize(),
        parquetConfig.getPageSize(),
        parquetConfig.getPageSize(),
        parquetConfig.dictionaryEnabled(),
        DEFAULT_IS_VALIDATING_ENABLED,
        DEFAULT_WRITER_VERSION,
        FSUtils.registerFileSystem(file, parquetConfig.getHadoopConf()));

    // We cannot accurately measure the snappy compressed output file size. We are choosing a
    // conservative 10%
    // TODO - compute this compression ratio dynamically by looking at the bytes written to the
    // stream and the actual file size reported by HDFS
    this.maxFileSize = parquetConfig.getMaxFileSize()
        + Math.round(parquetConfig.getMaxFileSize() * parquetConfig.getCompressionRatio());
  }

  public boolean canWrite() {
    if (getWrittenRecordCount() >= recordNumForNextCheck) {
      long dataSize = getDataSize();
      long avgRecordSize = dataSize / getWrittenRecordCount();
      // Follow the parquet block size check logic here, return false
      // if it is within ~2 records of the limit
      if (dataSize > (maxFileSize - avgRecordSize * 2)) {
        return false;
      }
      // Do check it in the halfway
      recordNumForNextCheck = (recordNumForNextCheck + maxFileSize / avgRecordSize) / 2;
    }
    return true;
  }

  @Override
  public void write(R object) throws IOException {
    super.write(object);
    writtenRecordCount.incrementAndGet();
  }

  protected long getWrittenRecordCount() {
    return writtenRecordCount.get();
  }
}
