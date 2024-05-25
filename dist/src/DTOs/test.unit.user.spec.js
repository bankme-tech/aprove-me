"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_repo_1 = require("../repositories/user-repo");
const payable_repo_1 = require("../repositories/payable-repo");
const prisma_payable_repo_1 = require("../repositories/prisma/prisma-payable-repo");
const prisma_assignor_repo_1 = require("../repositories/prisma/prisma-assignor-repo");
const assignor_repo_1 = require("../repositories/assignor-repo");
const prisma_user_repo_1 = require("../repositories/prisma/prisma-user-repo");
const prisma_service_1 = require("../database/prisma.service");
const mock_usu_rios_1 = require("../../test/mocks/mock-usu\u00E1rios");
const app_controller_1 = require("../app.controller");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth-service");
const jwt_1 = require("@nestjs/jwt");
describe('Usuário', () => {
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
        service = module.get(user_repo_1.UserRepo);
    });
    it('Deve estar definido', () => {
        expect(service).toBeDefined();
    });
    describe('Crianção de usuário', () => {
        it('Deve criar um novo usuário', async () => {
            jest.spyOn(service, 'createUser');
            const result = await controller.createUser(mock_usu_rios_1.MOCK_NOVO_USUARIO);
            expect(result.login).toEqual(mock_usu_rios_1.MOCK_NOVO_USUARIO.login);
            expect(result.id).toBeDefined();
        });
        it('Deve falhar ao tentar criar um novo usuário sem senha', async () => {
            jest.spyOn(service, 'createUser');
            try {
                await controller.createUser(mock_usu_rios_1.MOCK_NOVO_USUARIO_SEM_SENHA);
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.BadRequestException);
            }
        });
        it('Internal erro ao tentar criar um novo usuário', async () => {
            jest.spyOn(service, 'createUser').mockReset;
            try {
                await controller.createUser;
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.InternalServerErrorException);
            }
        });
        it('Deve obter um usuário pelo id', async () => {
            jest.spyOn(service, 'getUserById');
            const result = await controller.getUserById(mock_usu_rios_1.MOCK_NOVO_USUARIO_RESPONSE.id);
            expect(result.login).toEqual(mock_usu_rios_1.MOCK_NOVO_USUARIO_RESPONSE.login);
            expect(result.id).toEqual(mock_usu_rios_1.MOCK_NOVO_USUARIO_RESPONSE.id);
        });
        it('Deve falhar ao tentar obter um usuário pelo id', async () => {
            jest.spyOn(service, 'getUserById');
            try {
                await controller.getUserById(10);
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.NotFoundException);
            }
        });
        it('Deve obter um usuário pelo login', async () => {
            jest.spyOn(service, 'getUserByLogin');
            const result = await controller.getUserByLogin(mock_usu_rios_1.MOCK_NOVO_USUARIO.login);
            expect(result.login).toEqual(mock_usu_rios_1.MOCK_NOVO_USUARIO.login);
            expect(result.id).toBeDefined();
        });
        it('Deve falhar ao tentar obter um usuário pelo login', async () => {
            jest.spyOn(service, 'getUserByLogin');
            try {
                await controller.getUserByLogin('teste2');
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.NotFoundException);
            }
        });
        it('Deve obter um array usuário', async () => {
            jest.spyOn(service, 'getUsersAll');
            const result = await controller.getUserAll();
            expect(result).toBeInstanceOf(Array);
        });
        it('Deve atualizar um usuário', async () => {
            jest.spyOn(service, 'updateUser');
            const { id } = mock_usu_rios_1.MOCK_NOVO_USUARIO;
            const result = await controller.updateUser(id, mock_usu_rios_1.MOCK_UPDATE_USUARIO);
            expect(result).toEqual(mock_usu_rios_1.MOCK_UPDATE_USUARIO);
            expect(result.password).toBeDefined();
            expect(result.password).toEqual(mock_usu_rios_1.MOCK_UPDATE_USUARIO.password);
            expect(result.login).toBeDefined();
            expect(result.login).toEqual('teste2');
            expect(result.id).toBeDefined();
            expect(result.id).toEqual(mock_usu_rios_1.MOCK_UPDATE_USUARIO.id);
        });
        it('Deve falhar ao tentar atualizar um usuário com id inválido', async () => {
            jest.spyOn(service, 'updateUser');
            try {
                await controller.updateUser(10, mock_usu_rios_1.MOCK_NOVO_USUARIO);
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.NotFoundException);
            }
        });
        it('Deve falhar ao deletar um usuário com id inválido', async () => {
            jest.spyOn(service, 'deleteUser');
            try {
                await controller.deleteUser(10);
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.NotFoundException);
            }
        });
        it('Deve deletar um usuário com id válido', async () => {
            jest.spyOn(service, 'deleteUser');
            const result = await controller.deleteUser(mock_usu_rios_1.MOCK_NOVO_USUARIO_RESPONSE.id);
            expect(result).toBeUndefined();
        });
        it('Deve falhar ao tentar obter um array de usuários', async () => {
            jest.spyOn(service, 'getUsersAll');
            try {
                await controller.getUserAll();
            }
            catch (error) {
                expect(error.message).toBe('Users not found');
            }
        });
    });
});
//# sourceMappingURL=test.unit.user.spec.js.map