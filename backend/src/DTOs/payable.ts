import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class PayableDto {
  @ApiProperty({
    required: true,
    type: String,
    format: 'uuid',
    example: '2c91808f-e1d0-4b8b-b8c2-e8e7f7e8e8e8',
    description: 'ID do recebível',
  })
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  id: string;

  @ApiProperty({
    required: true,
    type: Number,
    example: 1000,
    description: 'Valor do recebível',
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({
    required: true,
    type: Date,
    example: '2021-06-01T00:00:00.000Z',
    description: 'Data de emissão do recebível',
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  emissionDate: Date;

  @ApiProperty({
    required: true,
    type: String,
    format: 'uuid',
    example: '2c91808f-e1d0-4b8b-b8c2-e8e7f7e8e8e8',
    description: 'Referência do identificador do cedente',
  })
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  assignor: string;
}
