import { Entity, PropsConstructor } from '@/core/domain/entity';

interface Props {
  document: string;
  email: string;
  phone: string;
  name: string;
}

export class Assignor extends Entity<Props> {
  constructor(props: PropsConstructor<Props>) {
    super(props);
  }

  get document() {
    return this.props.document;
  }

  get email() {
    return this.props.email;
  }

  get phone() {
    return this.props.phone;
  }

  get name() {
    return this.props.name;
  }
}
