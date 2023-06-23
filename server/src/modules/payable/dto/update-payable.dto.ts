import { IsNumber, IsOptional } from 'class-validator';

export class UpdatePayableDto {
    @IsOptional()
    @IsNumber()
    valueInCents: number;
}
