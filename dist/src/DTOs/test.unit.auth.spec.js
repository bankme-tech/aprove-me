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
    });
});
//# sourceMappingURL=test.unit.auth.spec.js.map