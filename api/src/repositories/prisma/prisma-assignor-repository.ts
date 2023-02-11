import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateAssignorBody } from "src/dtos/create-assignor-body";
import { UpdateAssignor } from "src/dtos/update-assignor";
import { AssignorRepository } from "../assignor-repository";

@Injectable()
export class PrismaAssignorRepository implements AssignorRepository {
    constructor(private prisma: PrismaService) { }

    async addAssignor(data: CreateAssignorBody) {
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

    async getAssignor(id: number) {
        return await this.prisma.assignor.findFirst(
            { where: { id: Number(id) } }
        );
    }

    async getAssignorAll() {
        return await this.prisma.assignor.findMany();
    }

    async updateAssignor(id: string, body: UpdateAssignor) {
        return this.prisma.assignor.update({
            where: { id: Number(id) },
            data: body,
        });
    }


    async deleteAssignor(id: string) {
        const assignorValue = await this.prisma.assignor.delete({
            where: { id: Number(id) }
        });
        const payableValue = await this.prisma.payable.deleteMany({
            where: { assignor: assignorValue.id }
        });

        return { message: "Successfully deleted" };
    }
}