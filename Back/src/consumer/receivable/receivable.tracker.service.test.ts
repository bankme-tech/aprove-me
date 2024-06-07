import { DateUtils } from "@/shared/utils/date";
import { Test, TestingModule } from "@nestjs/testing";
import { ReceivableTrackerService } from "./receivable.tracker.service";

describe("ReceivableTrackerService", () => {
    let service: ReceivableTrackerService;

    const batchName = DateUtils.today().toLocaleDateString();
    const total = 5;
    const successQty = 4;
    const failureQty = 1;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReceivableTrackerService]
        }).compile();

        service = module.get<ReceivableTrackerService>(ReceivableTrackerService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("startBatch", () => {
        it("should start a new batch", () => {
            service.startBatch(batchName, total);

            expect(service.hasBatch(batchName)).toBe(true);
            expect(service.isBatchComplete(batchName)).toBe(false);
        });
    });

    describe("incrementSuccess", () => {
        it("should increment success count of a batch", () => {
            service.startBatch(batchName, total);
            service.incrementSuccess(batchName);

            expect(service.getBatchSuccess(batchName)).toBe(1);
        });
    });

    describe("incrementFailure", () => {
        it("should increment failure count of a batch", () => {
            service.startBatch(batchName, total);
            service.incrementFailure(batchName);

            expect(service.getBatchFailure(batchName)).toBe(1);
        });
    });

    describe("isBatchComplete", () => {
        it("should check if a batch is complete", () => {
            service.startBatch(batchName, total);

            expect(service.isBatchComplete(batchName)).toBe(false);

            service.incrementSuccess(batchName);
            service.incrementSuccess(batchName);
            service.incrementSuccess(batchName);
            service.incrementSuccess(batchName);
            service.incrementFailure(batchName);

            expect(service.isBatchComplete(batchName)).toBe(true);
        });
    });

    describe("getBatchSuccess", () => {
        it("should check quantity batch success", () => {
            service.startBatch(batchName, total);

            service.incrementSuccess(batchName);
            service.incrementSuccess(batchName);
            service.incrementSuccess(batchName);
            service.incrementSuccess(batchName);
            service.incrementFailure(batchName);

            expect(service.getBatchSuccess(batchName)).toBe(successQty);
        });
    });

    describe("getBatchFailure", () => {
        it("should check quantity batch fail", () => {
            service.startBatch(batchName, total);

            service.incrementSuccess(batchName);
            service.incrementSuccess(batchName);
            service.incrementSuccess(batchName);
            service.incrementSuccess(batchName);
            service.incrementFailure(batchName);

            expect(service.getBatchFailure(batchName)).toBe(failureQty);
        });
    });

    describe("clearBatch", () => {
        it("should clear a batch", () => {
            service.startBatch(batchName, total);
            service.clearBatch(batchName);

            expect(service.hasBatch(batchName)).toBe(false);
        });
    });
});
