import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateReceivableDto {
    @IsNumber()
    @IsOptional()
    value?: number;

    @IsDateString()
    @IsNotEmpty()
    @IsOptional()
    emissionDate?: string;
}
