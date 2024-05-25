"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const payable_repo_1 = require("../repositories/payable-repo");
const prisma_payable_repo_1 = require("../repositories/prisma/prisma-payable-repo");
const prisma_assignor_repo_1 = require("../repositories/prisma/prisma-assignor-repo");
const assignor_repo_1 = require("../repositories/assignor-repo");
const prisma_user_repo_1 = require("../repositories/prisma/prisma-user-repo");
const prisma_service_1 = require("../database/prisma.service");
const app_controller_1 = require("../app.controller");
const mock_assignor_1 = require("../../test/mocks/mock-assignor");
const user_repo_1 = require("../repositories/user-repo");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth-service");
describe('Cedente', () => {
    let controller;
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                jwt_1.JwtModule.register({
                    secret: process.env.JWT_SECRET,
                    signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
                }),
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                prisma_service_1.PrismaService,
                { provide: payable_repo_1.PayableRepo, useClass: prisma_payable_repo_1.prismaPayableRepo },
                { provide: assignor_repo_1.AssignorRepo, useClass: prisma_assignor_repo_1.prismaAssignorRepo },
                { provide: user_repo_1.UserRepo, useClass: prisma_user_repo_1.prismaUserRepo },
                auth_service_1.AuthService,
            ],
        }).compile();
        controller = module.get(app_controller_1.AppController);
        service = module.get(assignor_repo_1.AssignorRepo);
    });
    it('Deve estar definido', () => {
        expect(service).toBeDefined();
    });
    describe('CRUD de cedente', () => {
        it('Deve criar um novo cedente', async () => {
            jest.spyOn(service, 'createAssignor');
            const result = await controller.createAssignor(mock_assignor_1.MOCK_NOVO_CEDENTE);
            expect(result).toBeDefined();
            expect(result).toEqual(mock_assignor_1.MOCK_NOVO_CEDENTE);
            expect(result.document).toEqual('aaaaaaaaaaaaa');
            expect(result.email).toBeDefined();
            expect(result.email).toEqual(mock_assignor_1.MOCK_NOVO_CEDENTE.email);
            expect(result.id).toBeDefined();
            expect(result.id).toEqual(mock_assignor_1.MOCK_NOVO_CEDENTE.id);
        });
        it('Deve falhar ao criar cedente que já existe', async () => {
            jest.spyOn(service, 'createAssignor');
            try {
                await controller.createAssignor(mock_assignor_1.MOCK_NOVO_CEDENTE);
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.BadRequestException);
            }
        });
        it('Deve listar todos os cedentes', async () => {
            jest.spyOn(service, 'getAllAssignors');
            const result = await controller.getAssignorsAll();
            expect(result).toBeDefined();
            expect(result).toBeInstanceOf(Array);
        });
        it('Deve buscar um cedente por id', async () => {
            jest.spyOn(service, 'getAssignorById');
            const result = await controller.getAssignorById(mock_assignor_1.MOCK_NOVO_CEDENTE.id);
            expect(result).toBeDefined();
            expect(result).toEqual(mock_assignor_1.MOCK_NOVO_CEDENTE);
        });
        it('Deve retornar um arry de cedentes', async () => {
            jest.spyOn(service, 'getAllAssignors');
            const result = await controller.getAssignorsAll();
            expect(result).toBeDefined();
            expect(result).toBeInstanceOf(Array);
            expect(result).toEqual([mock_assignor_1.MOCK_NOVO_CEDENTE]);
        });
        it('Internal Server Error', async () => {
            jest.spyOn(controller, 'getAssignorsAll').mockReset();
            try {
                await controller.getAssignorsAll();
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.InternalServerErrorException);
            }
        });
        it('Deve falhar ao tentar atualizar um cedente com id inválido', async () => {
            jest.spyOn(service, 'updateAssignor');
            const id = 'invalid-id';
            try {
                await controller.getAssignorById(id);
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.NotFoundException);
                expect(error.message).toEqual(`Assignor with ID ${id} not found`);
            }
        });
        it('Deve atualizar um cedente com id válido', async () => {
            jest.spyOn(controller, 'updateAssignor');
            const id = mock_assignor_1.MOCK_UPDATE_CEDENTE.id;
            const response = await controller.updateAssignor(id, mock_assignor_1.MOCK_UPDATE_CEDENTE);
            expect(response).toEqual(mock_assignor_1.MOCK_UPDATE_CEDENTE);
        });
        it('Deve falhar ao tentar deletar um cedente', async () => {
            jest.spyOn(service, 'deleteAssignor');
            try {
                await controller.getAssignorById('invalid-id');
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.NotFoundException);
            }
        });
        it('Deve deletar um cedente', async () => {
            jest.spyOn(controller, 'deleteAssignor');
            await controller.deleteAssignor(mock_assignor_1.MOCK_NOVO_CEDENTE.id);
            expect(controller.deleteAssignor).toBeDefined();
        });
        it('Deve retornar exceção not found', async () => {
            try {
                jest.spyOn(controller, 'getAssignorsAll');
                await controller.getAssignorsAll();
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.NotFoundException);
            }
        });
        it('Deve falhar ao tentar buscar um cedente por id inválido', async () => {
            try {
                jest.spyOn(service, 'getAssignorById');
                controller.getAssignorById('invalid-id');
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.NotFoundException);
            }
        });
    });
});
//# sourceMappingURL=test.unit.assignor.spec.js.map