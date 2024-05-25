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
        service = module.get(auth_service_1.AuthService);
    });
    describe('Autenticação', () => {
        it('Deve conseguir logar', async () => {
            jest.spyOn(service, 'authenticate');
            const login = {
                login: 'teste',
                password: 'XXXXX',
            };
            await controller.createUser(login);
            const { token } = await controller.auth(login);
            expect(token).toBeDefined();
            expect(service.authenticate).toHaveBeenCalled();
            expect(typeof token).toBe('string');
        });
        it('Deve falhar ao logar com senha errada', async () => {
            jest.spyOn(service, 'authenticate');
            const login2 = {
                login: 'teste',
                password: 'zzzzzz',
            };
            try {
                await controller.auth(login2);
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.BadRequestException);
            }
        });
        it('Internal Error', async () => {
            jest.spyOn(service, 'authenticate').mockRejectedValue(new Error());
            const login2 = {
                login: 'teste',
                password: 'zzzzzz',
            };
            try {
                await controller.auth(login2);
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.HttpException);
            }
        });
        it('Deve falhar ao logar com login errado', async () => {
            jest.spyOn(service, 'authenticate');
            const login = {
                login: 'teste32',
                password: 'XXXXX',
            };
            try {
                await controller.auth(login);
            }
            catch (error) {
                expect(error).toBeInstanceOf(common_1.NotFoundException);
            }
        });
    });
});
//# sourceMappingURL=test.unit.auth.spec.js.map