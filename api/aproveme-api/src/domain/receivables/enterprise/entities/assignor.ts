import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface AssignorProps {
  document: string;
  email: string;
  phone: string;
  name: string;
}

export class Assignor extends Entity<AssignorProps> {
  static create(props: AssignorProps, id?: UniqueEntityId) {
    const assignor = new Assignor(props, id);

    return assignor;
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

  get name() {
    return this.props.name;
  }
}
