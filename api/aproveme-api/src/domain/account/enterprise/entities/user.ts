import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface UserProps {
  login: string;
  password: string;
}

export class User extends Entity<UserProps> {
  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User(props, id);

    return user;
  }

  public get login(): string {
    return this.props.login;
  }

  public get password(): string {
    return this.props.password;
  }
}
