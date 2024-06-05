import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UpdateAssignorDto {
    @IsString({ message: "Documento tem tipo texto" })
    @Length(1, 30)
    @IsNotEmpty({ message: "Documento precisa ser preenchido" })
    @IsOptional()
    document?: string;

    @IsEmail()
    @Length(1, 140)
    @IsNotEmpty({ message: "Email precisa ser preenchido" })
    @IsOptional()
    email?: string;

    @IsString({ message: "Celular tem tipo texto" })
    @Length(1, 20)
    @IsNotEmpty({ message: "Celular precisa ser preenchido" })
    @IsOptional()
    phone?: string;

    @IsString({ message: "Nome tem tipo texto" })
    @Length(1, 140)
    @IsNotEmpty({ message: "Nome precisa ser preenchido" })
    @IsOptional()
    name?: string;
}
