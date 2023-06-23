import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infra/prisma/prisma.service";

@Injectable()
export class PayableRepository {
    constructor (
        private readonly prisma: PrismaService
    ) {}

    async create(data): Promise<any> {
        return await this.prisma.payable.create({ data })
    }

    async findOne(args): Promise<any> {
        return await this.prisma.payable.findFirst(args)
    }

    async findAll(args): Promise<any[]> {
        return await this.prisma.payable.findMany(args)
    }

    async update(id, data): Promise<any> {
        return await this.prisma.payable.update({
            where: {
                id
            },
            data
        })
    }

    async remove(id): Promise<any> {
        return await this.prisma.payable.update({
            where: {
                id
            },
            data: {
                // add deletedAt condition                
            }
        })
    }
} 