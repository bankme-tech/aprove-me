import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAssignorDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30, {
    message:
      'Document must be a string with a maximum length of 30 characters.',
  })
  document: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(140)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20, {
    message: 'Phone must be a string with a maximum length of 20 characters.',
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(140, {
    message: 'Name must be a string with a maximum length of 140 characters.',
  })
  name: string;
}
