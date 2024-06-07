import { Injectable } from "@nestjs/common";
import { ReceivableTrackerDto } from "./dto/receivableTracker.dto";

@Injectable()
export class ReceivableTrackerService {
    private batches: Record<string, ReceivableTrackerDto> = {};

    public startBatch(batchName: string, total: number): void {
        this.batches[batchName] = { total, success: 0, failure: 0 };
    }

    public incrementSuccess(batchName: string): void {
        this.batches[batchName].success += 1;
    }

    public incrementFailure(batchName: string): void {
        this.batches[batchName].failure += 1;
    }

    public isBatchComplete(batchName: string): boolean {
        const batch = this.batches[batchName];
        return batch && batch.success + batch.failure >= batch.total;
    }

    public hasBatch(batchName: string): boolean {
        return Boolean(this.batches[batchName]);
    }

    public getBatchSuccess(batchName: string): number {
        return this.batches[batchName].success ?? 0;
    }

    public getBatchFailure(batchName: string): number {
        return this.batches[batchName].failure ?? 0;
    }

    public clearBatch(batchName: string): void {
        delete this.batches[batchName];
    }
}
