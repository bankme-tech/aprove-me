import { PayableEntity } from '../entities/payable.entity';

export type CreatePayableOutputDTO = Pick<
  PayableEntity,
  'id' | 'value' | 'assignorId' | 'emissionDate'
>;
