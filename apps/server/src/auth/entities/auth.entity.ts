import { Entity } from '@/common/entity/entity.base'
import { Optional } from '@/common/types'
import * as bcrypt from 'bcrypt'

export interface AuthProps {
  login: string
  password: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Auth extends Entity<AuthProps> {
  set login(login: string) {
    this.props.login = login
  }

  get login() {
    return this.props.login
  }

  async hasPassword() {
    const passHash = await bcrypt.hash(this.password, 12)
    this.props.password = passHash
  }

  async comparePassword(passwordHashed: string) {
    return await bcrypt.compare(passwordHashed, this.password)
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<AuthProps, 'createdAt' | 'updatedAt'>,
    id?: string,
  ) {
    const assignor = new Auth(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return assignor
  }
}
