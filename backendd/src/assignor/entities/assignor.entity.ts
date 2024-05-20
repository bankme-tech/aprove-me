import { Payable } from '@prisma/client';

export class Assignor {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
  payables?: Payable[];

  constructor(
    id: string,
    document: string,
    email: string,
    phone: string,
    name: string,
    payables?: Payable[],
  ) {
    this.id = id;
    this.document = document;
    this.email = email;
    this.phone = phone;
    this.name = name;
    this.payables = payables;
  }
}
