import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreatePayableAssignorBody } from "src/dtos/create-payable-assignor-body";
import { CreatePayableBody } from "src/dtos/create-payable-body";
import { UpdatePayable } from "src/dtos/update-payable";
import { PayableRepository } from "../payable-repository";

@Injectable()
export class PrismaPayableRepository implements PayableRepository {
    constructor(private prisma: PrismaService) { }

    async payable(data: CreatePayableAssignorBody) {
        const { value, emissionDate, document, email, name, phone } = data;

        const assignorValue = await this.prisma.assignor.create({
            data: {
                id: undefined,
                document,
                email,
                phone,
                name,
            },
        });

        const payableValue = await this.prisma.payable.create({
            data: {
                value,
                emissionDate,
                assignor: assignorValue.id,
            },
        });
        return { assignorValue, payableValue };
    }

    async addPayable(body: CreatePayableBody) {
        const { value, emissionDate, assignor } = body;

        return await this.prisma.payable.create({
            data: {
                value,
                emissionDate,
                assignor,
            },
        });
    }
    async getPayable(id: string) {
        return await this.prisma.payable.findFirst(
            { where: { id } }
        );
    }

    async getpayableAll() {
        return await this.prisma.payable.findMany();
    }

    async updatePayable(id: string, body: UpdatePayable) {
        return this.prisma.payable.update({
            where: { id },
            data: body,
        });
    }

    async deletePayable(id: string) {
        return this.prisma.payable.delete({
            where: { id }
        });
    }

}