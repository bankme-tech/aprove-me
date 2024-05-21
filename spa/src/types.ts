import { UUID } from "crypto"

export type AssignorType = {
  id?: UUID,
  document: string,
  email: string,
  phone: string,
  name: string
}

export type PayableType = {
  id?: UUID,
  value: number,
  emissionDate: string,
  assignor?: UUID
}