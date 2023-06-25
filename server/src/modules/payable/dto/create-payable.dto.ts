import { IsDateString, IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreatePayableDto {
    @IsNotEmpty()
    @IsNumber()
    valueInCents: number;

    @IsNotEmpty()
    @IsDateString()
    emissionDate: string; 

    @IsNotEmpty()
    // @IsUUID() // TODO - TESTAR QUANDO ESTIVER GERANDO UUID CORRETAMENTE
    assignorId: string;
}

export interface BatchCreatePayableDto {
    payables: CreatePayableDto[]
}
