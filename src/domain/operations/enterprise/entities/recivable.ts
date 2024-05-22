import { Entity } from "src/core/entities/entity"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { Optional } from "src/core/types/optional"

export interface RecivableProps {
  value: number
  emissionDate: Date
  assignor: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Recivable extends Entity<RecivableProps> {
  get value() {
    return this.props.value
  }

  get emissionDate() {
    return this.props.emissionDate
  }

  get assignor() {
    return this.props.assignor
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

  setValue(value: number) {
    this.props.value = value
    this.touch()
  }

  setEmissionDate(emissionDate: Date) {
    this.props.emissionDate = emissionDate
    this.touch()
  }

  setAssignor(assignor: string) {
    this.props.assignor = assignor
    this.touch()
  }

  static create(props: Optional<RecivableProps, 'createdAt'>, id?: UniqueEntityID) {
    const recivable = new Recivable({
      ...props,
      createdAt: new Date(),
    }, id)

    return recivable
  }
}