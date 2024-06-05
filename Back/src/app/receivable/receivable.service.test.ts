// import { HttpException, HttpStatus } from "@nestjs/common";
// import { Test, TestingModule } from "@nestjs/testing";
// import { beforeEach, describe, it } from "node:test";
// import { AssignorService } from "../assignor/assignor.service";
// import { CreateReceivableDto } from "./dto/createReceivable.dto";
// import { ReceivableDto } from "./dto/receivable.dto";
// import { UpdateReceivableDto } from "./dto/updateReceivable.dto";
// import { ReceivableException } from "./exception/receivableException.enum";
// import { ReceivableRepository } from "./receivable.repository";
// import { ReceivableService } from "./receivable.service";

// describe("ReceivableService", () => {
//     let service: ReceivableService;
//     let repository: ReceivableRepository;
//     let assignorService: AssignorService;

//     const mockRepository = {
//         create: jest.fn(),
//         findById: jest.fn(),
//         update: jest.fn(),
//         delete: jest.fn()
//     };

//     const mockAssignorService = {
//         getById: jest.fn()
//     };

//     const newReceivable: CreateReceivableDto = {
//         assignorId: "1",
//         value: 1000,
//         emissionDate: new Date().toISOString()
//     };
//     const viewReceivable: ReceivableDto = {
//         id: "1",
//         assignorId: "1",
//         value: 1000,
//         emissionDate: new Date(),
//         assignor: {
//             id: "1",
//             email: "test@email.com",
//             document: "111111111",
//             name: "Test",
//             phone: "3333666999"
//         }
//     };
//     const updateReceivable: UpdateReceivableDto = {
//         value: 1500,
//         emissionDate: new Date().toISOString()
//     };
//     const searchedId = "1";

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [
//                 ReceivableService,
//                 { provide: ReceivableRepository, useValue: mockRepository },
//                 { provide: AssignorService, useValue: mockAssignorService }
//             ]
//         }).compile();

//         service = module.get<ReceivableService>(ReceivableService);
//         repository = module.get<ReceivableRepository>(ReceivableRepository);
//         assignorService = module.get<AssignorService>(AssignorService);
//     });

//     it("should be defined", () => {
//         expect(service).toBeDefined();
//     });

//     describe("create", () => {
//         it("should create a receivable successfully", async () => {
//             mockAssignorService.getById.mockResolvedValue(true);
//             mockRepository.create.mockResolvedValue(undefined);

//             await expect(service.create(newReceivable)).resolves.not.toThrow();
//             expect(mockAssignorService.getById).toHaveBeenCalledWith(newReceivable.assignorId);
//             expect(mockRepository.create).toHaveBeenCalledWith(newReceivable);
//         });

//         it("should throw an exception if assignor id not found", async () => {
//             mockAssignorService.getById.mockResolvedValue(null);

//             await expect(service.create(newReceivable)).rejects.toThrow(
//                 new HttpException(ReceivableException.ASSIGNOR_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
//             );
//         });
//     });

//     describe("getById", () => {
//         it("should return a receivable successfully", async () => {
//             mockRepository.findById.mockResolvedValue(viewReceivable);

//             await expect(service.getById(searchedId)).resolves.toEqual(viewReceivable);
//             expect(mockRepository.findById).toHaveBeenCalledWith(searchedId);
//         });

//         it("should throw an exception if id not found", async () => {
//             mockRepository.findById.mockResolvedValue(null);

//             await expect(service.getById(searchedId)).rejects.toThrow(
//                 new HttpException(ReceivableException.ID_NOT_FOUND, HttpStatus.NOT_FOUND)
//             );
//         });
//     });

//     describe("update", () => {
//         it("should update a receivable successfully", async () => {
//             mockRepository.findById.mockResolvedValue(viewReceivable);
//             mockRepository.update.mockResolvedValue(undefined);

//             await expect(service.update(updateReceivable, searchedId)).resolves.not.toThrow();
//             expect(mockRepository.findById).toHaveBeenCalledWith(searchedId);
//             expect(mockRepository.update).toHaveBeenCalledWith(searchedId, updateReceivable);
//         });

//         it("should throw an exception if id not found", async () => {
//             mockRepository.findById.mockResolvedValue(null);

//             await expect(service.update(updateReceivable, searchedId)).rejects.toThrow(
//                 new HttpException(ReceivableException.ID_NOT_FOUND, HttpStatus.NOT_FOUND)
//             );
//         });
//     });

//     describe("delete", () => {
//         it("should delete a receivable successfully", async () => {
//             mockRepository.findById.mockResolvedValue(viewReceivable);
//             mockRepository.delete.mockResolvedValue(undefined);

//             await expect(service.delete(searchedId)).resolves.not.toThrow();
//             expect(mockRepository.findById).toHaveBeenCalledWith(searchedId);
//             expect(mockRepository.delete).toHaveBeenCalledWith(searchedId);
//         });

//         it("should throw an exception if id not found", async () => {
//             mockRepository.findById.mockResolvedValue(null);

//             await expect(service.delete(searchedId)).rejects.toThrow(
//                 new HttpException(ReceivableException.ID_NOT_FOUND, HttpStatus.NOT_FOUND)
//             );
//         });
//     });
// });
