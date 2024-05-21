import { Entity, PropsConstructor } from '@/core/domain/entity';

interface Props {
  value: number;
  emissionDate: Date;
  assignor: string;
}

export class Payable extends Entity<Props> {
  constructor(props: PropsConstructor<Props>) {
    super(props);
  }

  get value() {
    return this.props.value;
  }

  get emissionDate() {
    return this.props.emissionDate;
  }

  get assignor() {
    return this.props.assignor;
  }
}
