import { PrismaService } from '../../database/prisma.service';
import { AssignorRepo } from '../assignor-repo';
import { AssignorDto } from '../../DTOs/assignor';
export declare class prismaAssignorRepo implements AssignorRepo {
    private prisma;
    constructor(prisma: PrismaService);
    createAssignor(body: AssignorDto): Promise<AssignorDto>;
    getAssignorById(id: string): Promise<AssignorDto>;
    getAllAssignors(): Promise<AssignorDto[]>;
    updateAssignor(id: string, body: AssignorDto): Promise<AssignorDto>;
    deleteAssignor(id: string): Promise<void>;
}
