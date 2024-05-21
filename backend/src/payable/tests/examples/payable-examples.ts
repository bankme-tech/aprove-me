import { Payable } from '../../../payable/entities/payable.entity';

export const payable = {
  payable1: new Payable('payable1', 1000, new Date(), 'assignor1'),
  payable2: new Payable('payable2', 2000, new Date(), 'assignor2'),
};
