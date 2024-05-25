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
exports.prismaPayableRepo = void 0;
const prisma_service_1 = require("../../database/prisma.service");
const common_1 = require("@nestjs/common");
let prismaPayableRepo = class prismaPayableRepo {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPayable(body) {
        const { id, value, emissionDate, assignor } = body;
        const newReceived = await this.prisma.recebivel.create({
            data: {
                id,
                value,
                emissionDate: new Date(emissionDate),
                assignor,
            },
        });
        return newReceived;
    }
    async getPayableById(id) {
        const received = await this.prisma.recebivel.findUnique({
            where: {
                id,
            },
        });
        return received;
    }
    async getAllPayables() {
        const received = await this.prisma.recebivel.findMany();
        return received;
    }
    async updatePayable(id, body) {
        const { value, emissionDate, assignor } = body;
        const updatedReceived = await this.prisma.recebivel.update({
            where: {
                id,
            },
            data: {
                value,
                emissionDate: new Date(emissionDate),
                assignor,
            },
        });
        return updatedReceived;
    }
    async deletePayable(id) {
        await this.prisma.recebivel.delete({
            where: {
                id,
            },
        });
    }
};
exports.prismaPayableRepo = prismaPayableRepo;
exports.prismaPayableRepo = prismaPayableRepo = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], prismaPayableRepo);
//# sourceMappingURL=prisma-payable-repo.js.map