import { BaseEntity } from '~/common/entities/base-entity';
import { Either, left, right } from '~/common/utils/either';
import { InvalidEntityEntry } from '~/common/exceptions/invalid-entity-entry.exception';
import { isEmail, isPhoneNumber } from 'class-validator';

interface AssignorEntityProps {
  name: string;
  document: string;
  email: string;
  phone: string;
}

export class AssignorEntity extends BaseEntity<AssignorEntityProps> {
  private static MAX_NAME_LENGTH = 140;
  private static MAX_DOCUMENT_LENGTH = 30;
  private static MAX_EMAIL_LENGTH = 140;
  private static MAX_PHONE_LENGTH = 20;

  get name() {
    return this.props.name;
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

  private constructor(props: AssignorEntityProps, id?: string) {
    super(props, id);
  }

  static validate(props: AssignorEntityProps): Either<Error, true> {
    if (props.name.length > this.MAX_NAME_LENGTH) {
      return left(
        new InvalidEntityEntry(
          `Name overtook ${this.MAX_NAME_LENGTH} characters.`,
        ),
      );
    }

    if (props.document.length > this.MAX_DOCUMENT_LENGTH) {
      return left(
        new InvalidEntityEntry(
          `Document overtook ${this.MAX_DOCUMENT_LENGTH} characters.`,
        ),
      );
    }

    if (props.email.length > this.MAX_EMAIL_LENGTH) {
      return left(
        new InvalidEntityEntry(
          `Email overtook ${this.MAX_EMAIL_LENGTH} characters.`,
        ),
      );
    }

    if (props.phone.length > this.MAX_PHONE_LENGTH) {
      return left(
        new InvalidEntityEntry(
          `Phone overtook ${this.MAX_PHONE_LENGTH} characters.`,
        ),
      );
    }

    if (!isEmail(props.email)) {
      return left(new InvalidEntityEntry('You must provide a valid email.'));
    }

    if (!props.phone.trim().startsWith('+')) {
      return left(
        new InvalidEntityEntry(
          'Your phone must starts with + and country code.',
        ),
      );
    }

    if (!isPhoneNumber(props.phone)) {
      return left(new InvalidEntityEntry('You must provide a valid phone.'));
    }

    return right(true);
  }

  static create(
    props: AssignorEntityProps,
    id?: string,
  ): Either<Error, AssignorEntity> {
    const isValid = this.validate(props);

    if (isValid.isLeft()) return left(isValid.value);

    return right(new AssignorEntity(props, id));
  }
}
