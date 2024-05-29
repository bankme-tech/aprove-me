import { Prisma } from "@prisma/client";

export class CreateAssignorDto implements Prisma.AssignorCreateInput {
  name: string;
  document: string;
  email: string;
  phone: string;
}

