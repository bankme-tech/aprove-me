import type { Prisma } from "@prisma/client";

export class CreatePayableDto implements Prisma.PayableCreateInput {
    id?: string;
    amount: number;
    emissionDate: string | Date;
    assignor: Prisma.AssignorCreateNestedOneWithoutPayablesInput;
}

