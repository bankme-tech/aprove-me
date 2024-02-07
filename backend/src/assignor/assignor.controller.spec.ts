import { Test, TestingModule } from "@nestjs/testing";
import { AssignorController } from "./assignor.controller";
import { AssignorService } from "./assignor.service";
import { Assignor } from "./assignor.model";

const assignor = new Assignor();
assignor.id = '123';
assignor.document = '12345678900';
assignor.email = 'test@test.com';
assignor.phone = '5521999999999';
assignor.name = 'Test Assignor';

const assignors: Assignor[] = [assignor]

describe("AssignorController", () => {
    let assignorController: AssignorController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AssignorController],
            providers: [
                {
                    provide: AssignorService,
                    useValue: {
                        getAllAssignors: jest.fn().mockResolvedValue(assignors),
                        getAssignorById: jest.fn().mockResolvedValue(assignor),
                        createAssignor: jest.fn().mockResolvedValue(assignor),
                        updateAssignor: jest.fn().mockResolvedValue(assignor),
                        deleteAssignorById: jest.fn().mockResolvedValue(assignor)
                    }
                }
            ]
        }).compile();

        assignorController = module.get<AssignorController>(AssignorController);
    });

    it("should be defined", () => {
        expect(assignorController).toBeDefined();
    });

    describe("getAssignors", () => {
        it("should return a list of assignors successfully", async () => {
            const result = await assignorController.getAssignors();

            expect(result).toEqual(assignors);
        });
    });

    describe("getAssignor", () => {
        it("should return one assignor with the same param id sent successfully", async () => {
            const id = '123';

            const result = await assignorController.getAssignor(id);

            expect(result.id).toBe(id);
        });
    });

    describe("createAssignor", () => {
        it("should return one assignor with the same data sent but with an id not null successfully", async () => {
            const newAssignor = new Assignor();
            newAssignor.document = '12345678900';
            newAssignor.email = 'test@test.com';
            newAssignor.phone = '5521999999999';
            newAssignor.name = 'Test Assignor';

            const result = await assignorController.createAssignor(newAssignor);

            expect(result.id).not.toBe(null);
            expect(result.document).toBe(newAssignor.document);
            expect(result.email).toBe(newAssignor.email);
            expect(result.phone).toBe(newAssignor.phone);
            expect(result.name).toBe(newAssignor.name);
        });
    });
    
    describe("deleteAssignor", () => {
        it("should return one assignor with the same param id sent successfully", async () => {
            const id = '123';

            const result = await assignorController.deleteAssignor(id);

            expect(result.id).toBe(id);
        });
    });
});