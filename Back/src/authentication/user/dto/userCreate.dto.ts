import { IsNotEmpty, IsString, Length } from "class-validator";

export class UserCreateDto {
    @IsString({ message: "Senha tem tipo texto" })
    @IsNotEmpty({ message: "Senha precisa ser preenchida" })
    password: string;

    @IsString({ message: "Login tem tipo texto" })
    @Length(1, 140)
    @IsNotEmpty({ message: "Login precisa ser preenchido" })
    login: string;
}
