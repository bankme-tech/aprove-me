import { HttpException, HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, it } from "node:test";
import { AssignorRepository } from "./assignor.repository";
import { AssignorService } from "./assignor.service";
import { AssignorDto } from "./dto/assignor.dto";
import { CreateAssignorDto } from "./dto/createAssignor.dto";
import { UpdateAssignorDto } from "./dto/updateAssignor.dto";
import { AssignorException } from "./exception/assignorException.enum";

describe("AssignorService", () => {
    let service: AssignorService;
    let repository: AssignorRepository;

    const mockRepository = {
        hasEmail: jest.fn(),
        hasDocument: jest.fn(),
        hasPhone: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        findByEmail: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    };

    const newAssignor: CreateAssignorDto = {
        email: "test@example.com",
        document: "111111111",
        phone: "3333666999",
        name: "Test"
    };
    const viewAssignor: AssignorDto = {
        id: "1",
        email: "test@example.com",
        document: "123456789",
        phone: "1234567890",
        name: "Test"
    };
    const updateAssignor: UpdateAssignorDto = {
        email: "test@example.com",
        document: "123456789",
        phone: "1234567890",
        name: "Test"
    };
    const searchedId = "1";
    const undefinedId: string = undefined as any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AssignorService, { provide: AssignorRepository, useValue: mockRepository }]
        }).compile();

        service = module.get<AssignorService>(AssignorService);
        repository = module.get<AssignorRepository>(AssignorRepository);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("create", () => {
        it("should create an assignor successfully", async () => {
            mockRepository.hasEmail.mockResolvedValue(false);
            mockRepository.hasDocument.mockResolvedValue(false);
            mockRepository.hasPhone.mockResolvedValue(false);
            mockRepository.create.mockResolvedValue(undefined);

            await expect(service.create(newAssignor)).resolves.not.toThrow();
            expect(mockRepository.hasEmail).toHaveBeenCalledWith(newAssignor.email);
            expect(mockRepository.hasDocument).toHaveBeenCalledWith(newAssignor.document);
            expect(mockRepository.hasPhone).toHaveBeenCalledWith(newAssignor.phone);
            expect(mockRepository.create).toHaveBeenCalledWith(newAssignor);
        });

        it("should throw an exception if email already exists", async () => {
            mockRepository.hasEmail.mockResolvedValue(true);

            await expect(service.create(newAssignor)).rejects.toThrow(
                new HttpException(AssignorException.EMAIL_ALREADY_EXIST, HttpStatus.CONFLICT)
            );
        });

        it("should throw an exception if document already exists", async () => {
            mockRepository.hasDocument.mockResolvedValue(true);

            await expect(service.create(newAssignor)).rejects.toThrow(
                new HttpException(AssignorException.DOCUMENT_ALREADY_EXIST, HttpStatus.CONFLICT)
            );
        });

        it("should throw an exception if phone already exists", async () => {
            mockRepository.hasPhone.mockResolvedValue(true);

            await expect(service.create(newAssignor)).rejects.toThrow(
                new HttpException(AssignorException.PHONE_ALREADY_EXIST, HttpStatus.CONFLICT)
            );
        });
    });

    describe("getAll", () => {
        it("should return an assignor successfully", async () => {
            mockRepository.findAll.mockResolvedValue([viewAssignor]);

            await expect(service.getAll()).resolves.toEqual([viewAssignor]);
        });
    });

    describe("getById", () => {
        it("should return an assignor successfully", async () => {
            mockRepository.findById.mockResolvedValue(viewAssignor);

            await expect(service.getById(searchedId)).resolves.toEqual(viewAssignor);
            expect(mockRepository.findById).toHaveBeenCalledWith(searchedId);
        });

        it("should throw an exception if id is undefined", async () => {
            await expect(service.getById(undefinedId)).rejects.toThrow(
                new HttpException(AssignorException.ID_NOT_FOUND, HttpStatus.NOT_FOUND)
            );
        });

        it("should throw an exception if id not found", async () => {
            mockRepository.findById.mockResolvedValue(null);

            await expect(service.getById(searchedId)).rejects.toThrow(
                new HttpException(AssignorException.ID_NOT_FOUND, HttpStatus.NOT_FOUND)
            );
        });
    });

    describe("getByEmail", () => {
        it("should return an assignor successfully", async () => {
            mockRepository.findByEmail.mockResolvedValue(viewAssignor);

            await expect(service.getByEmail(searchedId)).resolves.toEqual(viewAssignor);
            expect(mockRepository.findByEmail).toHaveBeenCalledWith(searchedId);
        });

        it("should throw an exception if id is undefined", async () => {
            await expect(service.getByEmail(undefinedId)).rejects.toThrow(
                new HttpException(AssignorException.EMAIL_NOT_FOUND, HttpStatus.NOT_FOUND)
            );
        });

        it("should throw an exception if id not found", async () => {
            mockRepository.findByEmail.mockResolvedValue(null);

            await expect(service.getByEmail(searchedId)).rejects.toThrow(
                new HttpException(AssignorException.EMAIL_NOT_FOUND, HttpStatus.NOT_FOUND)
            );
        });
    });

    describe("update", () => {
        it("should update an assignor successfully", async () => {
            mockRepository.hasEmail.mockResolvedValue(false);
            mockRepository.hasDocument.mockResolvedValue(false);
            mockRepository.hasPhone.mockResolvedValue(false);
            mockRepository.findById.mockResolvedValue(searchedId);
            mockRepository.update.mockResolvedValue(undefined);

            await expect(service.update(updateAssignor, searchedId)).resolves.not.toThrow();
            expect(mockRepository.hasEmail).toHaveBeenCalledWith(updateAssignor.email);
            expect(mockRepository.hasDocument).toHaveBeenCalledWith(updateAssignor.document);
            expect(mockRepository.hasPhone).toHaveBeenCalledWith(updateAssignor.phone);
            expect(mockRepository.findById).toHaveBeenCalledWith(searchedId);
            expect(mockRepository.update).toHaveBeenCalledWith(searchedId, updateAssignor);
        });

        it("should throw an exception if id is undefined", async () => {
            await expect(service.update(updateAssignor, undefinedId)).rejects.toThrow(
                new HttpException(AssignorException.ID_NOT_FOUND, HttpStatus.NOT_FOUND)
            );
        });

        it("should throw an exception if email already exists", async () => {
            mockRepository.hasEmail.mockResolvedValue(true);

            await expect(service.update(updateAssignor, searchedId)).rejects.toThrow(
                new HttpException(AssignorException.EMAIL_ALREADY_EXIST, HttpStatus.CONFLICT)
            );
        });

        it("should throw an exception if document already exists", async () => {
            mockRepository.hasDocument.mockResolvedValue(true);

            await expect(service.update(updateAssignor, searchedId)).rejects.toThrow(
                new HttpException(AssignorException.DOCUMENT_ALREADY_EXIST, HttpStatus.CONFLICT)
            );
        });

        it("should throw an exception if phone already exists", async () => {
            mockRepository.hasPhone.mockResolvedValue(true);

            await expect(service.update(updateAssignor, searchedId)).rejects.toThrow(
                new HttpException(AssignorException.PHONE_ALREADY_EXIST, HttpStatus.CONFLICT)
            );
        });

        it("should throw an exception if id not found", async () => {
            mockRepository.findById.mockResolvedValue(null);

            await expect(service.update(updateAssignor, searchedId)).rejects.toThrow(
                new HttpException(AssignorException.ID_NOT_FOUND, HttpStatus.NOT_FOUND)
            );
        });
    });

    describe("delete", () => {
        it("should delete an assignor successfully", async () => {
            mockRepository.findById.mockResolvedValue(searchedId);
            mockRepository.delete.mockResolvedValue(undefined);

            await expect(service.delete(searchedId)).resolves.not.toThrow();
            expect(mockRepository.findById).toHaveBeenCalledWith(searchedId);
            expect(mockRepository.delete).toHaveBeenCalledWith(searchedId);
        });

        it("should throw an exception if id is undefined", async () => {
            await expect(service.delete(undefinedId)).rejects.toThrow(
                new HttpException(AssignorException.ID_NOT_FOUND, HttpStatus.NOT_FOUND)
            );
        });

        it("should throw an exception if id not found", async () => {
            mockRepository.findById.mockResolvedValue(null);

            await expect(service.delete(searchedId)).rejects.toThrow(
                new HttpException(AssignorException.ID_NOT_FOUND, HttpStatus.NOT_FOUND)
            );
        });
    });
});
