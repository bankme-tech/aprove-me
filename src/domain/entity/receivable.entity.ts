import { UniqueEntityIdVO } from '../common/value-object';

import { AssignorEntity, AssignorProps } from './assignor.entity';
import { Entity } from './entity';

export type ReceivableProps = {
  id?: string;
  value: number;
  emissionDate: Date | string;
  assignorId: string;
};

export class ReceivableEntity extends Entity {
  readonly id: UniqueEntityIdVO;
  readonly value: number;
  readonly emissionDate: Date;
  readonly assignorId: UniqueEntityIdVO;
  private _assignor: AssignorEntity;

  constructor(props: ReceivableProps) {
    super();
    this.id = props.id
      ? new UniqueEntityIdVO(props.id)
      : new UniqueEntityIdVO();
    this.value = props.value;
    this.emissionDate = new Date(props.emissionDate);
    this.assignorId = new UniqueEntityIdVO(props.assignorId);
  }

  static create(input: Omit<ReceivableProps, 'id'>): ReceivableEntity {
    return new ReceivableEntity(input);
  }

  addAssignor(props: AssignorProps): void {
    this._assignor = new AssignorEntity({ ...props });
  }

  toJSON() {
    return {
      ...this,
      id: this.id.value,
      assignorId: this.assignorId.value,
      assignor: this._assignor?.toJSON(),
    };
  }
}
