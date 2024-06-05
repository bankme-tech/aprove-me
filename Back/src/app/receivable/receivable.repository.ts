import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/shared/prisma/prisma.service";
import { CreateReceivableDto } from "./dto/createReceivable.dto";
import { ReceivableDto } from "./dto/receivable.dto";
import { UpdateReceivableDto } from "./dto/updateReceivable.dto";

@Injectable()
export class ReceivableRepository {
    constructor(private readonly database: PrismaService) {}

    async create(data: CreateReceivableDto): Promise<void> {
        await this.database.receivable.create({
            data
        });
    }
    async findById(id: string): Promise<ReceivableDto | null> {
        return await this.database.receivable.findUnique({
            where: { id },
            include: {
                assignor: true
            }
        });
    }
    async update(id: string, data: UpdateReceivableDto): Promise<void> {
        await this.database.receivable.update({
            where: { id },
            data
        });
    }
    async delete(id: string): Promise<void> {
        await this.database.receivable.delete({
            where: { id }
        });
    }
}
