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
const mock_payable_1 = require("../../test/mocks/mock-payable");
const user_repo_1 = require("../repositories/user-repo");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth-service");
describe('recebiveis', () => {
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
        service = module.get(payable_repo_1.PayableRepo);
    });
    it('Deve estar definido', () => {
        expect(service).toBeDefined();
    });
    describe('CRUD de recebiveis', () => {
        it('Deve criar um novo recebiveis', async () => {
            jest.spyOn(service, 'createPayable');
            const result = await controller.createPayable(mock_payable_1.MOCK_NOVO_RECEBIVEIS);
            expect(result).toBeDefined();
            expect(result).toEqual(mock_payable_1.MOCK_NOVO_RECEBIVEIS);
            expect(result.assignor).toEqual(mock_payable_1.MOCK_NOVO_RECEBIVEIS.assignor);
            expect(result.value).toBeDefined();
            expect(result.value).toEqual(121);
            expect(result.id).toBeDefined();
            expect(result.id).toEqual(mock_payable_1.MOCK_NOVO_RECEBIVEIS.id);
        });
        it('Internal Server Error na rota create', async () => {
            jest.spyOn(service, 'createPayable').mockReset();
            try {
                controller.createPayable;
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.InternalServerErrorException);
            }
        });
        it('Deve retornar um erro ao tentar criar um recebiveis existente', async () => {
            jest.spyOn(service, 'createPayable');
            try {
                await controller.createPayable(mock_payable_1.MOCK_NOVO_RECEBIVEIS);
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.BadRequestException);
            }
        });
        it('Deve listar todos os recebiveiss', async () => {
            jest.spyOn(service, 'getAllPayables');
            const result = await controller.getPayableAll();
            expect(result).toBeDefined();
            expect(result).toBeInstanceOf(Array);
        });
        it('Internal Server Error na rota getPayableAll', async () => {
            jest.spyOn(service, 'getAllPayables').mockReset();
            try {
                controller.getPayableAll;
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.InternalServerErrorException);
            }
        });
        it('Deve buscar um recebiveis por id', async () => {
            jest.spyOn(service, 'getPayableById');
            const result = await controller.getPayableById(mock_payable_1.MOCK_NOVO_RECEBIVEIS.id);
            expect(result).toBeDefined();
            expect(result).toEqual(mock_payable_1.MOCK_NOVO_RECEBIVEIS);
        });
        it('Internal Server Error na rota getPayableById', async () => {
            jest.spyOn(service, 'getPayableById').mockReset();
            try {
                controller.getPayableById;
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.InternalServerErrorException);
            }
        });
        it('Deve retornar um erro ao tentar buscar um recebiveis inexistente', async () => {
            jest.spyOn(service, 'getPayableById');
            try {
                await controller.getPayableById('123');
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.NotFoundException);
            }
        });
        it('Deve atualizar um recebiveis', async () => {
            jest.spyOn(service, 'updatePayable');
            const result = await controller.updatePayable(mock_payable_1.MOCK_NOVO_RECEBIVEIS.id, mock_payable_1.MOCK_UPDATE_RECEBIVEIS);
            expect(result).toBeDefined();
            expect(result.assignor).toEqual(mock_payable_1.MOCK_UPDATE_RECEBIVEIS.assignor);
            expect(result.value).toBeDefined();
            expect(result.value).toEqual(121000);
            expect(result.id).toBeDefined();
            expect(result.id).toEqual(mock_payable_1.MOCK_NOVO_RECEBIVEIS.id);
        });
        it('Internal Server Error na rota update', async () => {
            jest.spyOn(service, 'updatePayable').mockReset();
            try {
                controller.updatePayable;
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.InternalServerErrorException);
            }
        });
        it('Deve retornar um erro ao tentar atualizar um recebiveis inexistente', async () => {
            jest.spyOn(service, 'updatePayable');
            try {
                await controller.updatePayable('123', mock_payable_1.MOCK_UPDATE_RECEBIVEIS);
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.NotFoundException);
            }
        });
        it('Deve deletar um recebiveis', async () => {
            jest.spyOn(service, 'deletePayable');
            await controller.deletePayable(mock_payable_1.MOCK_NOVO_RECEBIVEIS.id);
            expect(controller.deletePayable).toBeDefined();
        });
        it('Interal Server Error na rota delete', async () => {
            jest.spyOn(service, 'deletePayable').mockReset();
            try {
                await controller.deletePayable;
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.InternalServerErrorException);
            }
        });
        it('Deve retornar um erro ao tentar deletar um recebiveis inexistente', async () => {
            jest.spyOn(service, 'deletePayable');
            try {
                await controller.deletePayable('123');
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.NotFoundException);
            }
        });
        it('Deve retornar um erro ao tentar listar recebiveis inexistentes', async () => {
            jest.spyOn(service, 'getAllPayables');
            try {
                await controller.getPayableAll();
            }
            catch (error) {
                expect(error.message).toBe(common_1.NotFoundException);
            }
        });
    });
});
//# sourceMappingURL=test.unit.payable.spec.js.map