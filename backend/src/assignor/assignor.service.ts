import { Injectable } from "@nestjs/common";
import { Assignor } from "./assignor.model";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AssignorService {
    constructor(private readonly prisma: PrismaService) { }

    getAllAssignors() {
        return this.prisma.assignor.findMany({});
    }

    getAssignorByDocument(document: string) {
        return this.prisma.assignor.findFirst({
            where: {
                document: document
            }
        });
    }

    createAssignor(assignor: Assignor) {
        return this.prisma.assignor.create({
            data: {
                document: assignor.document,
                email: assignor.email,
                name: assignor.name,
                phone: assignor.phone,
            }
        })
    }

    updateAssignor(assignor: Assignor) {
        return this.prisma.assignor.update({
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
}