import { UnprocessableEntityException } from '@nestjs/common';
import { Assignor } from '@core/assignor/model';
import { BaseViewModel } from '../base.view-model';
import { ApiProperty } from '@nestjs/swagger';

export class AssignorVMResponse {
  @ApiProperty({
    description: 'ID único do cedente.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Documento CPF ou CNPJ do cedente.',
    example: '123.456.789-00',
    maxLength: 30,
  })
  document: string;

  @ApiProperty({
    description: 'Email do cedente.',
    example: 'example@example.com',
    maxLength: 140,
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do cedente.',
    example: '(12) 3456-7890',
    maxLength: 20,
  })
  phone: string;

  @ApiProperty({
    description: 'Nome ou razão social do cedente.',
    example: 'João da Silva',
    maxLength: 140,
  })
  name: string;

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

export class AssignorViewModel implements BaseViewModel {
  public static toHTTP(assignor: Assignor): AssignorVMResponse {
    if (assignor.containNotifications) {
      throw new UnprocessableEntityException({
        notifications: assignor.notifications,
      });
    }

    return {
      id: assignor.id,
      name: assignor.name,
      phone: assignor.phone,
      email: assignor.email,
      document: assignor.document,
    };
  }
}
