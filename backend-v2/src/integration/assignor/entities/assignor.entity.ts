import { Assignor, Payable, Prisma } from "@prisma/client";

export class AssignorEntity implements Assignor {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  payables: Payable[];
}
