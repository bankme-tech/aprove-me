import { BaseEntity } from '~/common/entities/base-entity';
import { InvalidEntityEntry } from '~/common/exceptions/invalid-entity-entry.exception';
import { Either, left, right } from '~/common/utils/either';

interface AccountEntityProps {
  login: string;
  password: string;
}

export class AccountEntity extends BaseEntity<AccountEntityProps> {
  private static MIN_PASSWORD_LENGTH = 8;

  get login() {
    return this.props.login;
  }

  get password() {
    return this.props.password;
  }

  private constructor(props: AccountEntityProps, id?: string) {
    super(props, id);
  }

  static validate(props: AccountEntityProps): Either<Error, true> {
    if (props.password.length < this.MIN_PASSWORD_LENGTH)
      return left(
        new InvalidEntityEntry(
          `You must provide a password with more than ${this.MIN_PASSWORD_LENGTH} characters.`,
        ),
      );

    return right(true);
  }

  static create(
    props: AccountEntityProps,
    id?: string,
  ): Either<Error, AccountEntity> {
    const isValid = this.validate(props);

    if (isValid.isLeft()) return left(isValid.value);

    return right(new AccountEntity(props, id));
  }
}
