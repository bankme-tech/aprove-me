import { Assignor } from '@prisma/client';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';

export class TransformPayableToEmail {
  static transformEmailToSuccess(
    payable: CreatePayableDto,
    assignor: Assignor,
  ) {
    const { value } = payable;
    const { name, email } = assignor;
    return {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Payment processed',
      text: `Hello ${name}, your payment of ${value} has been processed.`,
    };
  }

  static transformEmailToFailure(
    payable: CreatePayableDto,
    assignor: Assignor,
  ) {
    const { value } = payable;
    const { name, email } = assignor;
    return {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Payment failed',
      text: `Hello ${name}, your payment of ${value} has failed.`,
    };
  }
}
