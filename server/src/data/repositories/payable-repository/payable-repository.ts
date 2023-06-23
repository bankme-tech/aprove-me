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
}