import { Entity, PropsConstructor } from '@/core/domain/entity';

interface Props {
  login: string;
  password: string;
}

export class User extends Entity<Props> {
  constructor(props: PropsConstructor<Props>) {
    super(props);
  }

  get login() {
    return this.props.login;
  }

  get password() {
    return this.props.password;
  }
}
