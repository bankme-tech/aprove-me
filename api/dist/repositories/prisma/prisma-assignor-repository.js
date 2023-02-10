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
exports.PrismaAssignorRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let PrismaAssignorRepository = class PrismaAssignorRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addAssignor(data) {
        const { document, email, name, phone } = data;
        return await this.prisma.assignor.create({
            data: {
                id: undefined,
                document,
                email,
                phone,
                name,
            },
        });
    }
    async getAssignor(id) {
        return await this.prisma.assignor.findFirst({ where: { id: Number(id) } });
    }
    async getAssignorAll() {
        return await this.prisma.assignor.findMany();
    }
    async updateAssignor(id, body) {
        return this.prisma.assignor.update({
            where: { id: Number(id) },
            data: body,
        });
    }
    async deleteAssignor(id) {
        const assignorValue = await this.prisma.assignor.delete({
            where: { id: Number(id) }
        });
        const payableValue = await this.prisma.payable.deleteMany({
            where: { assignor: assignorValue.id }
        });
        return { message: "Successfully deleted" };
    }
};
PrismaAssignorRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAssignorRepository);
exports.PrismaAssignorRepository = PrismaAssignorRepository;
//# sourceMappingURL=prisma-assignor-repository.js.map