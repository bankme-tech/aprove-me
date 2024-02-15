import { Assignor as PrismaAssignor } from '@prisma/client';
import { randomUUID } from 'crypto';

export class Assignor implements PrismaAssignor {
  id: string;
  created_at: Date;
  document: string;
  email: string;
  name: string;
  phone: string;
  deleted_at: Date | null;
  updated_at: Date;

  static create(
    props: Omit<Assignor, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>,
    id?: string,
  ) {
    const assignor = new Assignor();
    assignor.id = id ?? randomUUID();
    assignor.created_at = new Date();
    assignor.updated_at = new Date();
    assignor.deleted_at = null;
    assignor.document = props.document;
    assignor.email = props.email;
    assignor.name = props.name;
    assignor.phone = props.phone;

    return assignor;
  }
}
