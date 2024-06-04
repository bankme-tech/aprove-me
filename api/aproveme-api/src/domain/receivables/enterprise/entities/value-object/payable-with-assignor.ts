import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ValueObject } from "@/core/entities/value-object";

export interface PayableWithAssignorProps {
  payableId: UniqueEntityId;
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

export class PayableWithAssignor extends ValueObject<PayableWithAssignorProps> {
  static create(props: PayableWithAssignorProps) {
    return new PayableWithAssignor(props);
  }

  get payableId() {
    return this.props.payableId;
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
