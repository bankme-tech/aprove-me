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
exports.prismaAssignorRepo = void 0;
const prisma_service_1 = require("../../database/prisma.service");
const common_1 = require("@nestjs/common");
let prismaAssignorRepo = class prismaAssignorRepo {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAssignor(body) {
        const { id, name, email, phone, document } = body;
        const newAssignor = await this.prisma.cedente.create({
            data: {
                id,
                name,
                email,
                phone,
                document,
            },
        });
        return newAssignor;
    }
    async getAssignorById(id) {
        const assignor = await this.prisma.cedente.findUnique({
            where: {
                id,
            },
        });
        return assignor;
    }
    async getAllAssignors() {
        const assignors = await this.prisma.cedente.findMany();
        return assignors;
    }
    async updateAssignor(id, body) {
        const { name, email, phone, document } = body;
        const assignor = await this.prisma.cedente.update({
            where: {
                id,
            },
            data: {
                name,
                email,
                phone,
                document,
            },
        });
        return assignor;
    }
    async deleteAssignor(id) {
        await this.prisma.cedente.delete({
            where: {
                id,
            },
        });
    }
};
exports.prismaAssignorRepo = prismaAssignorRepo;
exports.prismaAssignorRepo = prismaAssignorRepo = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], prismaAssignorRepo);
//# sourceMappingURL=prisma-assignor-repo.js.map