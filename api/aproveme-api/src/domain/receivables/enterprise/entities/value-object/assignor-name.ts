import { ValueObject } from "@/core/entities/value-object";

export interface AssignorNameProps {
  id: string;
  name: string;
}

export class AssignorName extends ValueObject<AssignorNameProps> {
  static create(props: AssignorNameProps) {
    return new AssignorName(props);
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }
}
