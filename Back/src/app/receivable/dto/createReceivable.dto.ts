import { IsDateString, IsEmail, IsNotEmpty, IsNumberString } from "class-validator";

export class CreateReceivableDto {
    @IsNumberString(undefined, { message: "Valor precisa ser numérico" })
    @IsNotEmpty({ message: "Valor precisa ser preenchido" })
    value: number;

    @IsDateString(undefined, { message: "Valor tem tipo data" })
    @IsNotEmpty({ message: "Data de emissão precisa ser preenchido" })
    emissionDate: string;

    @IsEmail(undefined, { message: "Email do cedente tem tipo 'e-mail'" })
    @IsNotEmpty({ message: "Email do cedente precisa ser preenchido" })
    assignorEmail: string;
}
