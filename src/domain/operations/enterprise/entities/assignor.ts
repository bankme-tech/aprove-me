import { Entity } from "src/core/entities/entity"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { Optional } from "src/core/types/optional"

export interface AssignorProps {
  document: string
  email: string
  phone: string
  name: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Assignor extends Entity<AssignorProps> {
  get document() {
    return this.props.document
  }

  get email() {
    return this.props.email
  }

  get phone() {
    return this.props.phone
  }

  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  setName(name: string) {
    this.props.name = name
    this.touch()
  }

  setPhone(phone: string) {
    this.props.phone = phone
    this.touch()
  }

  setEmail(email: string) {
    this.props.email = email
    this.touch()
  }

  setDocument(document: string): void {
    if (document.length > 31) {
      throw new Error('Invalid Document Lenght')
    }

    this.props.document = document
    this.touch()
  }

  static create(props: Optional<AssignorProps, 'createdAt'>, id?: UniqueEntityID) {
    const assignor = new Assignor({
      ...props,
      createdAt: new Date(),
    }, id)

    return assignor
  }
}