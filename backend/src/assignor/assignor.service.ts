import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Assignor } from "@prisma/client";

@Injectable()
export class AssignorService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllAssignors() {
        return await this.prisma.assignor.findMany({
            where: {
                deleted: false
            }
        });
    }

    async getAssignorById(id: string) {
        return await this.prisma.assignor.findFirst({
            where: {
                id: id,
                deleted: false
            }
        });
    }

    async createAssignor(assignor: Assignor) {
        return await this.prisma.assignor.create({
            data: {
                document: assignor.document,
                email: assignor.email,
                name: assignor.name,
                phone: assignor.phone,
            }
        })
    }

    async updateAssignor(assignor: Assignor) {
        return await this.prisma.assignor.update({
            data: {
                id: assignor.id,
                document: assignor.document,
                email: assignor.email,
                name: assignor.name,
                phone: assignor.phone,
            },
            where: {
                id: assignor.id,
                deleted: false
            }
        })
    }

    async deleteAssignorById(id: string) {
        return await this.prisma.assignor.delete({
            where: {
                id: id
            }
        });
    }
}