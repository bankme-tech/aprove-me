import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface PayableProps {
  value: number;
  emissionDate: Date;
  assignorId: UniqueEntityId;
}

export class Payable extends Entity<PayableProps> {
  static create(props: PayableProps, id?: UniqueEntityId) {
    const assignor = new Payable(props, id);

    return assignor;
  }

  get value() {
    return this.props.value;
  }

  get emissionDate() {
    return this.props.emissionDate;
  }

  get assignorId() {
    return this.props.assignorId;
  }
}
