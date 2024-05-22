import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

const documentRegex =
  /^(\d{3})\.?(\d{3})\.?(\d{3})\-?(\d{2}$)$|^(\d{2})\.?(\d{3})\.?(\d{3})\/?([0-1]{4})\-?(\d{2})$/;

export class CreateAssignorDto {
  @IsNotEmpty()
  @IsString()
  @Length(0, 140)
  name: string;

  @IsNotEmpty()
  @Matches(documentRegex, {
    message: "document must be a valid 'cpf' or 'cnpj'",
  })
  @Length(0, 30)
  document: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(0, 140)
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  @Length(0, 20)
  phone: string;
}
