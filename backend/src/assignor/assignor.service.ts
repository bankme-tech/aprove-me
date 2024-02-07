import { Injectable } from "@nestjs/common";
import { Assignor } from "./assignor.model";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AssignorService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllAssignors() {
        return await this.prisma.assignor.findMany({});
    }

    async getAssignorByDocument(document: string) {
        return await this.prisma.assignor.findFirst({
            where: {
                document: document
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
                document: assignor.document,
                email: assignor.email,
                name: assignor.name,
                phone: assignor.phone,
            },
            where: {
                document: assignor.document
            }
        })
    }

    async deleteAssignorByDocument(document: string) {
        return await this.prisma.assignor.delete({
            where: {
                document: document
            }
        });
    }
}