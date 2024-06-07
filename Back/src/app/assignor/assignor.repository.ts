import { PrismaService } from "@/shared/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { AssignorDto } from "./dto/assignor.dto";
import { CreateAssignorDto } from "./dto/createAssignor.dto";
import { UpdateAssignorDto } from "./dto/updateAssignor.dto";

@Injectable()
export class AssignorRepository {
    constructor(private readonly database: PrismaService) {}

    async create(data: CreateAssignorDto): Promise<void> {
        await this.database.assignor.create({
            data
        });
    }
    async findAll(): Promise<AssignorDto[]> {
        return await this.database.assignor.findMany({
            orderBy: { email: "asc" }
        });
    }
    async findById(id: string): Promise<AssignorDto | null> {
        return await this.database.assignor.findUnique({
            where: { id }
        });
    }
    async findByEmail(email: string): Promise<AssignorDto | null> {
        return await this.database.assignor.findUnique({
            where: { email }
        });
    }
    async update(id: string, data: UpdateAssignorDto): Promise<void> {
        await this.database.assignor.update({
            where: { id },
            data
        });
    }
    async delete(id: string): Promise<void> {
        await this.database.assignor.delete({
            where: { id }
        });
    }
    async hasEmail(email: string): Promise<boolean> {
        const count = await this.database.assignor.count({
            where: { email }
        });
        return count > 0;
    }
    async hasDocument(document: string): Promise<boolean> {
        const count = await this.database.assignor.count({
            where: { document }
        });
        return count > 0;
    }
    async hasPhone(phone: string): Promise<boolean> {
        const count = await this.database.assignor.count({
            where: { phone }
        });
        return count > 0;
    }
}
