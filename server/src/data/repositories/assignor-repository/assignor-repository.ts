import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infra/prisma/prisma.service";

@Injectable()
export class AssignorRepository {
    constructor (
        private readonly prisma: PrismaService
    ) {}

    async create(data): Promise<any> {
        return await this.prisma.assignor.create({ data })
    }

    async findOne(args): Promise<any> {
        return await this.prisma.assignor.findFirst(args)
    }

    async findAll(args): Promise<any[]> {
        return await this.prisma.assignor.findMany(args)
    }

    async update(id, data): Promise<any> {
        return await this.prisma.assignor.update({
            where: {
                id
            },
            data
        })
    }

    async remove(id): Promise<any> {
        return await this.prisma.assignor.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            }
        })
    }
}