import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface ReceivableProps {
  value: number;
  emissionDate: Date;
  assignor: UniqueEntityId;
}

export class Receivable extends Entity<ReceivableProps> {
  static create(props: ReceivableProps, id?: UniqueEntityId) {
    const assignor = new Receivable(props, id);

    return assignor;
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
