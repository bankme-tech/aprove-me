import { Test, TestingModule } from "@nestjs/testing";
import { PayableController } from "./payable.controller";
import { Payable } from "./payable.model";
import { PayableService } from "./payable.service";

const emissionDate = new Date();

const payable = new Payable();
payable.id = '123';
payable.value = 100;
payable.emissionDate = emissionDate;
payable.assignorId = '123';

const payables: Payable[] = [payable];

describe("PayableController", () => {
    let payableController: PayableController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PayableController],
            providers: [
                {
                    provide: PayableService,
                    useValue: {
                        getAllPayables: jest.fn().mockResolvedValue(payables),
                        getPayableById: jest.fn().mockResolvedValue(payable),
                        createPayable: jest.fn().mockResolvedValue(payable),
                        updatePayable: jest.fn().mockResolvedValue(payable),
                        deletePayableById: jest.fn().mockResolvedValue(payable)
                    }
                }
            ]
        }).compile();

        payableController = module.get<PayableController>(PayableController);
    });

    it("should be defined", () => {
        expect(payableController).toBeDefined();
    });

    describe("getPayables", () => {
        it("should return a list of payables successfully", async () => {
            const result = await payableController.getPayables();

            expect(result).toEqual(payables);
        });
    });

    describe("getPayable", () => {
        it("should return one payable with the same param id sent successfully", async () => {
            const id = '123';

            const result = await payableController.getPayable(id);

            expect(result.id).toBe(id);
        });
    });

    describe("createPayable", () => {
        it("should return one payable with the same data sent but with an id not null successfully", async () => {
            const newPayable = new Payable();
            newPayable.value = 100;
            newPayable.emissionDate = emissionDate;
            newPayable.assignorId = '123';

            const result = await payableController.createPayable(newPayable);

            expect(result.id).not.toBe(null);
            expect(result.value).toBe(newPayable.value);
            expect(result.emissionDate).toBe(newPayable.emissionDate);
            expect(result.assignorId).toBe(newPayable.assignorId);
        });
    });

    describe("updatePayable", () => {
        it("should return the same payable sent successfully", async () => {
            const result = await payableController.updatePayable(payable);

            expect(result).toEqual(payable);
        });
    });

    describe("deletePayable", () => {
        it("should return one payable with the same param id sent successfully", async () => {
            const id = '123';

            const result = await payableController.deletePayable(id);

            expect(result.id).toBe(id);
        });
    });
});