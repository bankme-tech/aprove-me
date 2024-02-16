import { Receivable as PrismaReceivable } from '@prisma/client';
import { randomUUID } from 'crypto';

export class Receivable implements PrismaReceivable {
  id: string;
  assignor_id: string;
  emission_date: Date;
  value: number;
  created_at: Date;
  deleted_at: Date | null;
  updated_at: Date;

  static create(
    props: Omit<Receivable, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>,
    id?: string,
  ) {
    const receivable = new Receivable();
    receivable.id = id ?? randomUUID();
    receivable.created_at = new Date();
    receivable.updated_at = new Date();
    receivable.deleted_at = null;
    receivable.assignor_id = props.assignor_id;
    receivable.emission_date = props.emission_date;
    receivable.value = props.value;

    return receivable;
  }
}
