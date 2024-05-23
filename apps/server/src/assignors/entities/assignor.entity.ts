import { Entity } from '@/common/entity/entity.base'
import { Optional } from '@/common/types'

export interface AssignorProps {
  document: string
  email: string
  phone: string
  name: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Assignor extends Entity<AssignorProps> {
  set name(name: string) {
    this.props.name = name
  }

  get name() {
    return this.props.name
  }

  set document(document: string) {
    this.props.document = document
  }

  get document() {
    return this.props.document
  }

  set email(email: string) {
    this.props.email = email
  }

  get email() {
    return this.props.email
  }

  set phone(phone: string) {
    this.props.phone = phone
  }

  get phone() {
    return this.props.phone
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<AssignorProps, 'createdAt' | 'updatedAt'>,
    id?: string,
  ) {
    const assignor = new Assignor(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return assignor
  }
}
