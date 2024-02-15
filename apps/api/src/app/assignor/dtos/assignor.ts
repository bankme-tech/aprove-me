import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAssignorDTO {
  @IsNotEmpty({ message: 'document is required' })
  @MaxLength(30, { message: 'document must have a maximum of 30 characters' })
  document: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email invalid' })
  @MaxLength(140, { message: 'email must have a maximum of 140 characters' })
  email: string;

  @IsNotEmpty({ message: 'phone is required' })
  @MaxLength(20, { message: 'phone must have a maximum of 20 characters' })
  phone: string;

  @IsNotEmpty({ message: 'name is required' })
  @MaxLength(140, { message: 'name must have a maximum of 140 characters' })
  name: string;
}
