import { IsNumber, IsDate, IsUUID } from 'class-validator';

export class CreatePayablesDto {
  /** É a identificação de um recebível */
  @IsUUID()
  id: string;

  /** É o valor do recebível */
  @IsNumber()
  value: number;

  /** É a data de emissão do recebível */
  @IsDate()
  emissionDate: Date;

  /** Representa a identificação de um cedente */
  @IsUUID()
  assignor: string;
}

