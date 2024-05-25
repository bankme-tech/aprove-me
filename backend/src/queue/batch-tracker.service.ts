import { Injectable, Scope } from '@nestjs/common';

class BatchTracker {
  totalMessages: number;
  processedMessages: number;
  sucessfulMessages: number;
  failedMessages: number;
  callback: ({
    sucessfulMessages,
    failedMessages,
  }: {
    sucessfulMessages: number;
    failedMessages: number;
  }) => void | null;
}

Injectable({
  scope: Scope.DEFAULT,
});
export class BatchTrackerService {
  private batches: Record<string, BatchTracker>;
  constructor() {
    this.batches = {};
  }

  addBatch(batchId: string, totalMessages: number) {
    this.batches[batchId] = {
      totalMessages,
      processedMessages: 0,
      callback: null,
      failedMessages: 0,
      sucessfulMessages: 0,
    };
  }

  messageProcessed(batchId: string, sucessful: boolean) {
    const batch = this.batches[batchId];
    if (batch) {
      batch.processedMessages += 1;
      if (sucessful) {
        batch.sucessfulMessages += 1;
      } else {
        batch.failedMessages += 1;
      }

      if (batch.processedMessages === batch.totalMessages && batch.callback) {
        batch.callback({
          sucessfulMessages: batch.sucessfulMessages,
          failedMessages: batch.failedMessages,
        });

        delete this.batches[batchId];
      }
    }
  }

  onBatchComplete(
    batchId: string,
    callback: ({
      sucessfulMessages,
      failedMessages,
    }: {
      sucessfulMessages: number;
      failedMessages: number;
    }) => void,
  ) {
    const batch = this.batches[batchId];
    if (batch) {
      batch.callback = callback;
      if (batch.processedMessages === batch.totalMessages) {
        callback({
          sucessfulMessages: batch.sucessfulMessages,
          failedMessages: batch.failedMessages,
        });
      }
    }
  }
}
