import { Test, TestingModule } from "@nestjs/testing";
import { AssignorService } from "./assignor.service";
import { PrismaService } from "../prisma.service";
import { Assignor } from "./assignor.model";
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from "@prisma/client";

const assignor = new Assignor();
assignor.id = '123';
assignor.document = '12345678900';
assignor.email = 'test@test.com';
assignor.phone = '5521999999999';
assignor.name = 'Test Assignor';

const assignors: Assignor[] = [assignor]

describe("AssignorService", () => {
    let assignorService: AssignorService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AssignorService, PrismaService]
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep(PrismaClient))
            .compile();

        assignorService = module.get(AssignorService);
        prismaService = module.get(PrismaService);

        prismaService.assignor.findMany = jest.fn().mockResolvedValue(assignors);
        prismaService.assignor.findFirst = jest.fn().mockResolvedValue(assignor);
        prismaService.assignor.create = jest.fn().mockResolvedValue(assignor);
        prismaService.assignor.update = jest.fn().mockResolvedValue(assignor);
        prismaService.assignor.delete = jest.fn().mockResolvedValue(assignor);
    });

    it("should be defined", () => {
        expect(assignorService).toBeDefined();
        expect(prismaService).toBeDefined();
    });

    describe("getAllAssignors", () => {
        it("should return a list of assignors successfully", async () => {
            const result = await assignorService.getAllAssignors();

            expect(result).toEqual(assignors);
        });
    });

    describe("getAssignorById", () => {
        it("should return one assignor successfully with the same param id sent", async () => {
            const id = '123';

            const result = await assignorService.deleteAssignorById(id);

            expect(result.id).toBe(id);
        });
    });

    describe("createAssignor", () => {
        it("should return one assignor successfully with the same data sent with id", async () => {
            const newAssignor = new Assignor();
            newAssignor.document = '12345678900';
            newAssignor.email = 'test@test.com';
            newAssignor.phone = '5521999999999';
            newAssignor.name = 'Test Assignor';

            const result = await assignorService.createAssignor(newAssignor);

            expect(result.id).not.toBe(null);
            expect(result.document).toBe(newAssignor.document);
            expect(result.email).toBe(newAssignor.email);
            expect(result.phone).toBe(newAssignor.phone);
            expect(result.name).toBe(newAssignor.name);
        });
    });

    describe("updateAssignor", () => {
        it("should return one assignor successfully with the same data sent", async () => {
            const result = await assignorService.updateAssignor(assignor);

            expect(result).toEqual(assignor);
        });
    });

    describe("deleteAssignorById", () => {
        it("should return one assignor sucessfully with the same id sent", async () => {
            const id = '123';

            const result = await assignorService.deleteAssignorById(id);

            expect(result.id).toBe(id);
        });
    });
});