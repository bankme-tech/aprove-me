import { Controller, Get } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { PrismaService } from './database/prisma.service';
import { CreatePayableAssignorBody } from './dtos/create-payable-assignor-body';

@Controller('integrations')
export class AppController {
  constructor(private prisma: PrismaService) { }

  @Post('payable')
  async payable(@Body() body: CreatePayableAssignorBody) {
    const { value, emissionDate, document, email, name, phone } = body;

    const assignorValue = await this.prisma.assignor.create({
      data: {
        id: undefined,
        document,
        email,
        phone,
        name,
      },
    });

    const payableValue = await this.prisma.payable.create({
      data: {
        value,
        emissionDate,
        assignor: assignorValue.id,
      },
    });
    return { assignorValue, payableValue };
  }
}
