import { Entity } from "src/core/entities/entity"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"

export interface AccountProps {
  login: string
  password: string
}

export class Account extends Entity<AccountProps> {
  get login() {
    return this.props.login
  }

  get password() {
    return this.props.password
  }

  setPassword(password: string) {
    this.props.password = password
  }

  static create(props: AccountProps, id?: UniqueEntityID) {
    const account = new Account({
      ...props,
    }, id)

    return account
  }
}