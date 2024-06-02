import { ProcessBatchPayableInput } from '@core/payable/usecases/process-batch-payable/types';

type RegisterPayableInput = {
  value: number;
  assignor: string;
};

export class PayableDataBuilder {
  private props: RegisterPayableInput = {
    value: 100.5,
    assignor: '65b1c7d4-0f3a-4386-b0ef-32202f36b26b',
  };

  private payables: RegisterPayableInput[] = [];

  public static aPayable(): PayableDataBuilder {
    return new PayableDataBuilder();
  }

  public withValue(value: number): this {
    this.props.value = value;
    return this;
  }

  public withAssignor(assignor: string): this {
    this.props.assignor = assignor;
    return this;
  }

  public withMultiplePayables(count: number): this {
    this.payables = Array.from({ length: count }, () => ({ ...this.props }));
    return this;
  }

  public build(): RegisterPayableInput {
    return this.props;
  }

  public buildMultiple(): RegisterPayableInput[] {
    return this.payables.length > 0 ? this.payables : [this.props];
  }

  public buildBatchPayablesInput(): ProcessBatchPayableInput {
    return { payables: this.buildMultiple() };
  }
}
