import { IsNotEmpty, IsString, MaxLength } from "class-validator"
import { UUID } from "crypto"

export class AssignorDto {
  id: UUID

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  document: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(140)
  email: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(140)
  name: string
}