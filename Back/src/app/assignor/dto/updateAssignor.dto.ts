import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UpdateAssignorDto {
    @IsString()
    @Length(1, 30)
    @IsNotEmpty()
    @IsOptional()
    document?: string;

    @IsEmail()
    @Length(1, 140)
    @IsNotEmpty()
    @IsOptional()
    email?: string;

    @IsString()
    @Length(1, 20)
    @IsNotEmpty()
    @IsOptional()
    phone?: string;

    @IsString()
    @Length(1, 140)
    @IsNotEmpty()
    @IsOptional()
    name?: string;
}
