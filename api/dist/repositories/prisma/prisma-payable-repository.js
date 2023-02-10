"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPayableRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let PrismaPayableRepository = class PrismaPayableRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async payable(data) {
        const { value, emissionDate, document, email, name, phone } = data;
        const assignorValue = await this.prisma.assignor.create({
            data: {
                id: undefined,
                document,
                email,
                phone,
                name,
            },
        });
        const payableValue = await this.prisma.payable.create({
            data: {
                value,
                emissionDate,
                assignor: assignorValue.id,
            },
        });
        return { assignorValue, payableValue };
    }
    async addPayable(body) {
        const { value, emissionDate, assignor } = body;
        return await this.prisma.payable.create({
            data: {
                value,
                emissionDate,
                assignor,
            },
        });
    }
    async getPayable(id) {
        return await this.prisma.payable.findFirst({ where: { id } });
    }
    async getpayableAll() {
        return await this.prisma.payable.findMany();
    }
    async updatePayable(id, body) {
        return this.prisma.payable.update({
            where: { id },
            data: body,
        });
    }
    async deletePayable(id) {
        return this.prisma.payable.delete({
            where: { id }
        });
    }
};
PrismaPayableRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaPayableRepository);
exports.PrismaPayableRepository = PrismaPayableRepository;
//# sourceMappingURL=prisma-payable-repository.js.map