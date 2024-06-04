import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAssignorDto {
    @IsString()
    @Length(1, 30)
    @IsNotEmpty()
    document: string;

    @IsEmail()
    @Length(1, 140)
    @IsNotEmpty()
    email: string;

    @IsString()
    @Length(1, 20)
    @IsNotEmpty()
    phone: string;

    @IsString()
    @Length(1, 140)
    @IsNotEmpty()
    name: string;
}
