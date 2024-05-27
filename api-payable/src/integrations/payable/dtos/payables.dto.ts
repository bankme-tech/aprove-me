import { IsNumber, IsUUID, IsDateString, Min } from 'class-validator';

export class PayableDto {
  // /** É a identificação de um recebível */
  // @IsUUID()
  // id: string;

  /** É o valor do recebível */
  @IsNumber()
  @Min(0)
  value: number;

  /** É a data de emissão do recebível */
  @IsDateString()
  emissionDate: string;

  /** Representa a identificação de um cedente */
  @IsUUID()
  assignor: string;
}
