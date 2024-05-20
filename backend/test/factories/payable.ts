import { Payable, PayableProps } from '@/app/entities/payable';

export function makePayable(override: Partial<PayableProps> = {}): Payable {
  return new Payable({
    value: 45.5,
    assignorId: 'my-id',
    emissionDate: new Date(),
    ...override,
  });
}
