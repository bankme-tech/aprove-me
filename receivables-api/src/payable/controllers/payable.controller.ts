import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PayableDto } from '../dto/payable.dto';
import { PayableEntity } from '../payable.entity';
import { PayableService } from '../service/payable.service';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  async createPayable(
    @Body(ValidationPipe) payableDto: PayableDto,
  ): Promise<PayableEntity> {
    try {
      const payable: PayableEntity = { ...payableDto };
      return await this.payableService.createPayable(payable);
    } catch (error) {
      throw new BadRequestException(
        'Não foi possível criar o recebível. Verifique os dados e tente novamente.',
      );
    }
  }

  @Get(':id')
  async getPayableById(@Param('id') id: string): Promise<PayableEntity> {
    try {
      const payable = await this.payableService.getPayableById(id);
      if (!payable) {
        throw new NotFoundException('Recebível não encontrado.');
      }
      return payable;
    } catch (error) {
      throw new NotFoundException(
        'Não foi possível obter o recebível. Verifique o ID e tente novamente.',
      );
    }
  }

  @Patch(':id')
  async updatePayable(
    @Param('id') id: string,
    @Body() payableDto: PayableDto,
  ): Promise<PayableEntity> {
    try {
      const updatedPayable = await this.payableService.updatePayable(
        id,
        payableDto,
      );
      if (!updatedPayable) {
        throw new NotFoundException('Recebível não encontrado.');
      }
      return updatedPayable;
    } catch (error) {
      throw new BadRequestException(
        'Não foi possível atualizar o recebível. Verifique os dados e tente novamente.',
      );
    }
  }

  @Delete(':id')
  async deletePayable(@Param('id') id: string): Promise<void> {
    try {
      const deletedPayable = await this.payableService.deletePayable(id);
      if (!deletedPayable) {
        throw new NotFoundException('Recebível não encontrado.');
      }
    } catch (error) {
      throw new NotFoundException(
        'Não foi possível excluir o recebível. Verifique o ID e tente novamente.',
      );
    }
  }
}
