import { IsDateString, IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

export class UpdateReceivableDto {
    @IsOptional()
    @IsNumberString(undefined, { message: "Valor precisa ser numérico" })
    @IsNotEmpty({ message: "Valor precisa ser preenchido" })
    value?: number;

    @IsOptional()
    @IsDateString(undefined, { message: "Valor tem tipo data" })
    @IsNotEmpty({ message: "Data de emissão precisa ser preenchido" })
    emissionDate?: string;
}
