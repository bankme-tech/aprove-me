import { UniqueEntityIdVO } from "../common/value-object";
import { Entity } from "./entity";

export type ReceivableProps = {
  id?: string;
  value: number;
  emissionDate: Date | string;
  assignor: string;
}

export class ReceivableEntity extends Entity {
  readonly id: UniqueEntityIdVO;
  readonly value: number;
  readonly emissionDate: Date;
  readonly assignor: UniqueEntityIdVO;

  constructor(props: ReceivableProps) {
    super();
    this.id = props.id ? new UniqueEntityIdVO(props.id) : new UniqueEntityIdVO();
    this.value = props.value;
    this.emissionDate = new Date(props.emissionDate);
    this.assignor = new UniqueEntityIdVO(props.assignor);
  }

  static create(input: Omit<ReceivableProps, 'id'>): ReceivableEntity {
    return new ReceivableEntity(input);
  }

  toJSON() {
    return {
      ...this,
      id: this.id.value,
      assignor: this.assignor.value
    };
  }
};