import { PrismaService } from '../../database/prisma.service';
import { PayableRepo } from '../payable-repo';
import { PayableDto } from '../../DTOs/payable';
export declare class prismaPayableRepo implements PayableRepo {
    private prisma;
    constructor(prisma: PrismaService);
    createPayable(body: PayableDto): Promise<PayableDto>;
    getPayableById(id: string): Promise<PayableDto>;
    getAllPayables(): Promise<PayableDto[]>;
    updatePayable(id: string, body: PayableDto): Promise<PayableDto>;
    deletePayable(id: string): Promise<void>;
}
