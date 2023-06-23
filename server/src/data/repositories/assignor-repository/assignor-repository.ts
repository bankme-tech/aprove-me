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
}