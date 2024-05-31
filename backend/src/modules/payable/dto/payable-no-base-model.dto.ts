import { OmitType } from '@nestjs/swagger';
import { PayableDto } from './payable.dto';

export class PayableNoBaseModelDto extends OmitType(PayableDto, [
  'id',
] as const) {}

export type PayableNoBaseModel = Omit<PayableDto, 'id'>;
