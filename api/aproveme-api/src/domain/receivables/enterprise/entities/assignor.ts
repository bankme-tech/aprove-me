import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface AssignorProps {
  userId: UniqueEntityId;
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

  get userId() {
    return this.props.userId;
  }

  get document() {
    return this.props.document;
  }

  set document(document: string) {
    this.props.document = document;
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get phone() {
    return this.props.phone;
  }

  set phone(phone: string) {
    this.props.phone = phone;
  }

  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }
}
