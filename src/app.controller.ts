import { Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Post, Put } from '@nestjs/common/decorators';
import { PrismaService } from './database/prisma.service';
import { CreateAssignorBody } from './dtos/create-assignor-body';
import { CreatePayableAssignorBody } from './dtos/create-payable-assignor-body';
import { CreatePayableBody } from './dtos/create-payable-body';
import { UpdateAssignor } from './dtos/update-assignor';
import { UpdatePayable } from './dtos/update-payable';

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

  @Post('addPayable')
  async addPayable(@Body() body: CreatePayableBody) {
    const { value, emissionDate, assignor } = body;

    return await this.prisma.payable.create({
      data: {
        value,
        emissionDate,
        assignor,
      },
    });
  }

  @Post('addAssignor')
  async addAssignor(@Body() body: CreateAssignorBody) {
    const { document, email, name, phone } = body;

    const payableValue = await this.prisma.assignor.create({
      data: {
        id: undefined,
        document,
        email,
        phone,
        name,
      },
    });
    return { payableValue };
  }

  @Get('payable/:id')
  async getPayable(@Param() params) {
    const payableValue = await this.prisma.payable.findFirst(
      { where: { id: params.id } }
    );
    return { payableValue };
  }

  @Get('assignor/:id')
  async getAssignor(@Param() params) {
    const assignorValue = await this.prisma.assignor.findFirst(
      { where: { id: params.id } }
    );
    return { assignorValue };
  }

  @Put('payable/:id')
  async updatePayable(@Param() params, @Body() body: UpdatePayable) {

    return this.prisma.payable.update({
      where: { id: params.id },
      data: body,
    });
  }

  @Put('assignor/:id')
  async updateAssignor(@Param() params, @Body() body: UpdateAssignor) {
    return this.prisma.assignor.update({
      where: { id: params.id },
      data: body,
    });
  }

  @Delete('payable/:id')
  async deletePayable(@Param() params) {
    return this.prisma.payable.delete({
      where: { id: params.id }
    });

  }

  @Delete('assignor/:id')
  async deleteAssignor(@Param() params) {
    const assignorValue = await this.prisma.assignor.delete({
      where: { id: Number(params.id) }
    });
    const payableValue = await this.prisma.payable.deleteMany({
      where: { assignor: assignorValue.id }
    });

    return { message: "Successfully deleted" };
  }
}
