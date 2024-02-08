import { PrismaService } from "../prisma.service";
import { Payable } from "./payable.model";
import { PayableService } from "./payable.service";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";

const emissionDate = new Date();

const payable = new Payable();
payable.id = '123';
payable.value = 100;
payable.emissionDate = emissionDate;
payable.assignorId = '123';

const payables: Payable[] = [payable]

describe("PayableService", () => {
    let payableService: PayableService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PayableService, PrismaService]
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep(PrismaClient))
            .compile();

        payableService = module.get(PayableService);
        prismaService = module.get(PrismaService);

        prismaService.payable.findMany = jest.fn().mockResolvedValue(payables);
        prismaService.payable.findFirst = jest.fn().mockResolvedValue(payable);
        prismaService.payable.create = jest.fn().mockResolvedValue(payable);
        prismaService.payable.update = jest.fn().mockResolvedValue(payable);
        prismaService.payable.delete = jest.fn().mockResolvedValue(payable);
    });

    it("should be defined", () => {
        expect(payableService).toBeDefined();
        expect(prismaService).toBeDefined();
    });

    describe("getAllPayables", () => {
        it("should return a list of payables successfully", async () => {
            const result = await payableService.getAllPayables();

            expect(result).toEqual(payables);
        });
    });

    describe("getPayableById", () => {
        it("should return one payable successfully with the same param id sent", async () => {
            const id = '123';

            const result = await payableService.deletePayableById(id);

            expect(result.id).toBe(id);
        });
    });

    describe("createPayable", () => {
        it("should return one payable successfully with the same data sent with id", async () => {
            const newPayable = new Payable();
            newPayable.value = 100;
            newPayable.emissionDate = emissionDate;
            newPayable.assignorId = '123';

            const result = await payableService.createPayable(newPayable);

            expect(result.id).not.toBe(null);
            expect(result.value).toBe(newPayable.value);
            expect(result.emissionDate).toBe(newPayable.emissionDate);
            expect(result.assignorId).toBe(newPayable.assignorId);
        });
    });

    describe("updatePayable", () => {
        it("should return one payable successfully with the same data sent", async () => {
            const result = await payableService.updatePayable(payable);

            expect(result).toEqual(payable);
        });
    });

    describe("deletePayableById", () => {
        it("should return one payable sucessfully with the same id sent", async () => {
            const id = '123';

            const result = await payableService.deletePayableById(id);

            expect(result.id).toBe(id);
        });
    });
});