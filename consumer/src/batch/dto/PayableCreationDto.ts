import { IsNotEmpty } from 'class-validator';
import Payable from '../entity/Payable';

export default class PayableCreationQueueDto {
  @IsNotEmpty()
  batchId: string;

  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  emissionDate: Date;

  @IsNotEmpty()
  assignorId: string;

  constructor(
    value?: number,
    email?: string,
    emissionDate?: Date,
    assignorId?: string,
  ) {
    this.value = value;
    this.email = email;
    this.emissionDate = emissionDate;
    this.assignorId = assignorId;
  }

  toEntity(): Payable {
    const payable = new Payable();

    payable.value = this.value;
    payable.emissionDate = this.emissionDate;
    payable.assignorId = this.assignorId;

    return payable;
  }
}
