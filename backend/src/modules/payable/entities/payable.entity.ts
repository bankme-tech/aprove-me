import { isUUID } from 'class-validator';
import { BaseEntity } from '~/common/entities/base-entity';
import { InvalidEntityEntry } from '~/common/exceptions/invalid-entity-entry.exception';
import { Optional } from '~/common/types/optional';
import { Either, left, right } from '~/common/utils/either';
import { AssignorEntity } from '~/modules/assignor/entities/assignor.entity';

interface PayableEntityProps {
  value: number;
  emissionDate: Date;
  assignor: AssignorEntity | null;
  assignorId: string;
}

export class PayableEntity extends BaseEntity<PayableEntityProps> {
  private constructor(props: PayableEntityProps, id?: string) {
    super(props, id);
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

  get assignorId() {
    return this.props.assignorId;
  }

  static validate(props: PayableEntityProps): Either<Error, true> {
    if (!isUUID(props.assignorId)) {
      return left(new InvalidEntityEntry('AssignorId must be an uuid.'));
    }

    return right(true);
  }

  static create(
    props: Optional<PayableEntityProps, 'assignor'>,
    id?: string,
  ): Either<Error, PayableEntity> {
    const data: PayableEntityProps = { assignor: null, ...props };

    const isValid = this.validate(data);

    if (isValid.isLeft()) return left(isValid.value);

    return right(new PayableEntity(data, id));
  }
}
