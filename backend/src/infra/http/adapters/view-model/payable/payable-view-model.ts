import { UnprocessableEntityException } from '@nestjs/common';
import { Payable } from '@core/payable/model';
import { BaseViewModel } from '../base.view-model';
import { ApiProperty } from '@nestjs/swagger';

export class PayableVMResponse {
  @ApiProperty({
    description: 'ID único do recebível.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'O valor do recebível.',
    example: 1000.0,
  })
  value: number;

  @ApiProperty({
    description: 'A data de emissão do recebível.',
    example: '2024-05-30',
  })
  emissionDate: Date;

  @ApiProperty({
    description: 'Notificações relacionadas ao cedente.',
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    required: false,
  })
  notifications?: { [key: string]: string[] };
}

export class PayableViewModel implements BaseViewModel {
  public static toHTTP(
    payable: Payable,
    notifications?: { [key: string]: string[] },
  ): PayableVMResponse {
    if (notifications) {
      throw new UnprocessableEntityException({
        notifications,
      });
    }

    return {
      id: payable.id,
      value: payable.value,
      emissionDate: payable.emissionDate,
    };
  }
}
