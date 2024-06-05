import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAssignorDto {
    @IsString({ message: "Documento tem tipo texto" })
    @Length(1, 30)
    @IsNotEmpty({ message: "Documento precisa ser preenchido" })
    document: string;

    @IsEmail()
    @Length(1, 140)
    @IsNotEmpty({ message: "Email precisa ser preenchido" })
    email: string;

    @IsString({ message: "Celular tem tipo texto" })
    @Length(1, 20)
    @IsNotEmpty({ message: "Celular precisa ser preenchido" })
    phone: string;

    @IsString({ message: "Nome tem tipo texto" })
    @Length(1, 140)
    @IsNotEmpty({ message: "Nome precisa ser preenchido" })
    name: string;
}
