"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const auth_controller_1 = require("./auth/auth.controller");
const authService_service_1 = require("./auth/authService.service");
const authModule_module_1 = require("./auth/authModule.module");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const prisma_service_1 = require("./database/prisma.service");
const payable_repo_1 = require("./repositories/payable-repo");
const prisma_payable_repo_1 = require("./repositories/prisma/prisma-payable-repo");
const assignor_repo_1 = require("./repositories/assignor-repo");
const prisma_assignor_repo_1 = require("./repositories/prisma/prisma-assignor-repo");
const user_repo_1 = require("./repositories/user-repo");
const prisma_user_repo_1 = require("./repositories/prisma/prisma-user-repo");
const auth_service_1 = require("./auth/auth-service");
const jwt_1 = require("@nestjs/jwt");
const welcome_1 = require("./welcome");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const toke_1 = require("./auth/toke");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            authModule_module_1.AuthModuleModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
            }),
        ],
        controllers: [auth_controller_1.AuthController, app_controller_1.AppController, welcome_1.Welcome],
        providers: [
            authService_service_1.AuthServiceService,
            prisma_service_1.PrismaService,
            { provide: payable_repo_1.PayableRepo, useClass: prisma_payable_repo_1.prismaPayableRepo },
            { provide: assignor_repo_1.AssignorRepo, useClass: prisma_assignor_repo_1.prismaAssignorRepo },
            { provide: user_repo_1.UserRepo, useClass: prisma_user_repo_1.prismaUserRepo },
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            toke_1.CreateToken,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map