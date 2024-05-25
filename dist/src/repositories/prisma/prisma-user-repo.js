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
exports.prismaUserRepo = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const bcrypt = require("bcrypt");
let prismaUserRepo = class prismaUserRepo {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(body) {
        try {
            const salt = parseInt(process.env.SALT_ROUND, 10);
            const hashingPassword = await bcrypt.hash(body.password, salt);
            const createNewUser = await this.prisma.user.create({
                data: {
                    login: body.login,
                    password: hashingPassword,
                },
            });
            const newUser = {
                login: createNewUser.login,
                id: createNewUser.id,
            };
            return newUser;
        }
        catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw new Error('Erro ao criar usuário');
        }
    }
    async getUserById(id) {
        const getUserById = await this.prisma.user.findUnique({
            where: { id },
        });
        return getUserById;
    }
    async getUserByLogin(login) {
        const getUserByLogin = this.prisma.user.findFirst({
            where: { login },
        });
        return getUserByLogin;
    }
    async getUsersAll() {
        const getUsers = await this.prisma.user.findMany();
        return getUsers;
    }
    async updateUser(id, body) {
        const updateUser = await this.prisma.user.update({
            where: { id },
            data: body,
        });
        return updateUser;
    }
    async deleteUser(id) {
        const del = await this.prisma.user.delete({
            where: { id },
        });
        return del;
    }
};
exports.prismaUserRepo = prismaUserRepo;
exports.prismaUserRepo = prismaUserRepo = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], prismaUserRepo);
//# sourceMappingURL=prisma-user-repo.js.map