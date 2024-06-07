import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UpdateAssignorDto {
    @IsString({ message: "Documento tem tipo texto" })
    @Length(1, 30, { message: "Documento deve ter entre 1 a 30 caractéres" })
    @IsNotEmpty({ message: "Documento precisa ser preenchido" })
    @IsOptional()
    document?: string;

    @IsEmail()
    @Length(1, 140, { message: "Email deve ter entre 1 a 140 caractéres" })
    @IsNotEmpty({ message: "Email precisa ser preenchido" })
    @IsOptional()
    email?: string;

    @IsString({ message: "Celular tem tipo texto" })
    @Length(1, 20, { message: "Celular deve ter entre 1 a 20 caractéres" })
    @IsNotEmpty({ message: "Celular precisa ser preenchido" })
    @IsOptional()
    phone?: string;

    @IsString({ message: "Nome tem tipo texto" })
    @Length(1, 140, { message: "Nome deve ter entre 1 a 140 caractéres" })
    @IsNotEmpty({ message: "Nome precisa ser preenchido" })
    @IsOptional()
    name?: string;
}
