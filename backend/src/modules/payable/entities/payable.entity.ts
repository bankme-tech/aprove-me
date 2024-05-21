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

  set value(value: number) {
    if (value < 0) return;

    this.props.value = value;
  }

  get emissionDate() {
    return this.props.emissionDate;
  }

  set emissionDate(date: Date) {
    this.props.emissionDate = date;
  }

  get assignor() {
    return this.props.assignor;
  }

  set assignor(assignor: AssignorEntity) {
    this.props.assignor = assignor;
  }

  get assignorId() {
    return this.props.assignorId;
  }

  set assignorId(id: string) {
    if (!isUUID(id)) return;

    this.props.assignorId = id;
  }

  static validate(props: PayableEntityProps): Either<Error, true> {
    if (!isUUID(props.assignorId)) {
      return left(new InvalidEntityEntry('AssignorId must be an uuid.'));
    }

    if (props.value < 0) {
      return left(
        new InvalidEntityEntry('Value must be greater or equals to 0.'),
      );
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
