import { IsNumber, IsUUID, IsDateString, IsOptional } from 'class-validator';

export class PartialPayableDto {
  // /** É a identificação de um recebível */
  // @IsUUID()
  // id: string;

  /** É o valor do recebível */
  @IsNumber()
  @IsOptional()
  value?: number;

  /** É a data de emissão do recebível */
  @IsDateString()
  @IsOptional()
  emissionDate?: string;

  /** Representa a identificação de um cedente */
  @IsUUID()
  @IsOptional()
  assignor?: string;
}
