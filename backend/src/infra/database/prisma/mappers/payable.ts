import { Payable } from '@/app/entities/payable';
import { Payable as RawPayable } from '@prisma/client';

export class PrismaPayableMapper {
  static toDomain(raw: RawPayable) {
    return new Payable(raw, raw.id);
  }
}
