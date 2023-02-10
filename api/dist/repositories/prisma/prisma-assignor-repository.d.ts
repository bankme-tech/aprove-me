import { PrismaService } from "src/database/prisma.service";
import { CreateAssignorBody } from "src/dtos/create-assignor-body";
import { UpdateAssignor } from "src/dtos/update-assignor";
import { AssignorRepository } from "../assignor-repository";
export declare class PrismaAssignorRepository implements AssignorRepository {
    private prisma;
    constructor(prisma: PrismaService);
    addAssignor(data: CreateAssignorBody): Promise<import(".prisma/client").Assignor>;
    getAssignor(id: number): Promise<import(".prisma/client").Assignor>;
    getAssignorAll(): Promise<import(".prisma/client").Assignor[]>;
    updateAssignor(id: number, body: UpdateAssignor): Promise<import(".prisma/client").Assignor>;
    deleteAssignor(id: string): Promise<{
        message: string;
    }>;
}
