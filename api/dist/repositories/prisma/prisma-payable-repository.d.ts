import { PrismaService } from "src/database/prisma.service";
import { CreatePayableAssignorBody } from "src/dtos/create-payable-assignor-body";
import { CreatePayableBody } from "src/dtos/create-payable-body";
import { UpdatePayable } from "src/dtos/update-payable";
import { PayableRepository } from "../payable-repository";
export declare class PrismaPayableRepository implements PayableRepository {
    private prisma;
    constructor(prisma: PrismaService);
    payable(data: CreatePayableAssignorBody): Promise<{
        assignorValue: import(".prisma/client").Assignor;
        payableValue: import(".prisma/client").Payable;
    }>;
    addPayable(body: CreatePayableBody): Promise<import(".prisma/client").Payable>;
    getPayable(id: string): Promise<import(".prisma/client").Payable>;
    getpayableAll(): Promise<import(".prisma/client").Payable[]>;
    updatePayable(id: string, body: UpdatePayable): Promise<import(".prisma/client").Payable>;
    deletePayable(id: string): Promise<import(".prisma/client").Payable>;
}
