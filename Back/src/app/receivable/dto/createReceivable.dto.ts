import { IsDateString, IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateReceivableDto {
    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsDateString()
    @IsNotEmpty()
    emissionDate: string;

    @IsUUID()
    @IsNotEmpty()
    assignorId: string;
}
