"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./database/prisma.service");
const integrations_controller_1 = require("./integrations.controller");
const assignor_repository_1 = require("./repositories/assignor-repository");
const payable_repository_1 = require("./repositories/payable-repository");
const prisma_assignor_repository_1 = require("./repositories/prisma/prisma-assignor-repository");
const prisma_payable_repository_1 = require("./repositories/prisma/prisma-payable-repository");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [integrations_controller_1.IntegrationsController],
        providers: [prisma_service_1.PrismaService,
            {
                provide: assignor_repository_1.AssignorRepository,
                useClass: prisma_assignor_repository_1.PrismaAssignorRepository
            },
            {
                provide: payable_repository_1.PayableRepository,
                useClass: prisma_payable_repository_1.PrismaPayableRepository
            }],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map