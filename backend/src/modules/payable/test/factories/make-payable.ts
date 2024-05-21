import { faker } from '@faker-js/faker';
import { PayableEntity } from '../../entities/payable.entity';
import { randomUUID } from 'node:crypto';

interface OverrideProps {
  assignorId?: string;
}

export function makePayable(
  { assignorId }: OverrideProps = { assignorId: randomUUID() },
) {
  const payableOrError = PayableEntity.create({
    assignorId,
    emissionDate: faker.date.anytime(),
    value: faker.number.float(),
  });

  if (payableOrError.isLeft()) throw payableOrError.value;

  return payableOrError.value;
}
