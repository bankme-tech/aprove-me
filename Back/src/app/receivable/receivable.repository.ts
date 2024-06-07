import { PrismaService } from "@/shared/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { ReceivableDto } from "./dto/receivable.dto";
import { ReceivableListDto } from "./dto/receivableList.dto";
import { SaveReceivableDto } from "./dto/saveReceivable.dto";
import { UpdateReceivableDto } from "./dto/updateReceivable.dto";

@Injectable()
export class ReceivableRepository {
    constructor(private readonly database: PrismaService) {}

    async create(data: SaveReceivableDto): Promise<void> {
        await this.database.receivable.create({
            data
        });
    }
    async findAll(): Promise<ReceivableListDto[]> {
        return await this.database.receivable.findMany({
            select: { value: true, id: true, emissionDate: true },
            orderBy: { id: "asc" }
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
            data: {
                value: Number(data?.value),
                emissionDate: data?.emissionDate ? new Date(data?.emissionDate) : undefined
            }
        });
    }
    async delete(id: string): Promise<void> {
        await this.database.receivable.delete({
            where: { id }
        });
    }
}
