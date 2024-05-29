import { Prisma } from "@prisma/client";

export class UpdateAssignorDto implements Prisma.AssignorUpdateInput {
    id?: string;
    name?: string;
    document?: string;
    email?: string;
    phone?: string;
    payables?: Prisma.PayableUpdateManyWithoutAssignorNestedInput;
}
