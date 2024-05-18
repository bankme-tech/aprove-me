import { Payable } from '@prisma/client';

export class Assignor {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  Payables?: Payable[];

  constructor(id: string, name: string, email: string, phone: string, document: string, Payables?: Payable[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.document = document;
    this.Payables = Payables;
  }
}
