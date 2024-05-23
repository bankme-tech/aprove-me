import { IsDateString, IsNotEmpty, IsNumber } from "class-validator"
import { UUID } from "crypto"

export class ReceivableDto {
  id: UUID

  @IsNotEmpty()
  @IsNumber()
  value: number

  @IsNotEmpty()
  @IsDateString()
  emissionDate: Date

  assignor: UUID
}