import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ValueObject } from "@/core/entities/value-object";

export interface ReceivableWithAssignorProps {
  receivableId: UniqueEntityId;
  value: number;
  emissionDate: Date;
  assignor: {
    id: UniqueEntityId;
    document: string;
    email: string;
    phone: string;
    name: string;
  };
}

export class ReceivableWithAssignor extends ValueObject<ReceivableWithAssignorProps> {
  static create(props: ReceivableWithAssignorProps) {
    return new ReceivableWithAssignor(props);
  }

  get receivableId() {
    return this.props.receivableId;
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
