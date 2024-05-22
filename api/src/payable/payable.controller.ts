import { Controller, Post, Body, ValidationPipe, BadRequestException, Param, Get, NotFoundException, Delete, Patch, UseGuards } from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableAssignorDto } from 'src/dto-assignor-payable/create-payable-assignor.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { RolesGuard } from 'src/auth/auth.guard';



@Controller('integrations')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @UseGuards(RolesGuard)
  @Post('payable')
  async create(@Body(ValidationPipe) createPayableAssignorDto: CreatePayableAssignorDto) {
    try {
      return await this.payableService.create(createPayableAssignorDto);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      } else {
        throw new BadRequestException('Ocorreu um erro inesperado ao criar o recebível.');
      }
    }
  }


  @UseGuards(RolesGuard)
  @Get('/payable/:id')
  async findOne(@Param('id') id: string) {
    try {
      if (!id) {
        throw new BadRequestException('ID do recebível é obrigatório.');
      }
      return await this.payableService.findOne(id);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      } else {
        throw new BadRequestException('Erro inesperado ao buscar o recebível.');
      }
    }
  }

  @UseGuards(RolesGuard)
  @Delete('/payable/:id')
  async deletePayable(@Param('id') id: string) {
    try {
      if (!id) {
        throw new BadRequestException('ID do recebível é obrigatório.');
      }
      return await this.payableService.deletePayable(id);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      } else {
        throw new BadRequestException('Erro inesperado ao deletar o recebível.');
      }
    }
  }

  @UseGuards(RolesGuard)
  @Patch('/payable/:id')
  async updatePayable(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
    try {
      if (!id) {
        throw new BadRequestException('ID do recebível é obrigatório.');
      }
      return await this.payableService.updatePayable(id, updatePayableDto);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      } else {
        throw new BadRequestException('Erro inesperado ao editar o recebível.');
      }
    }
  }
}












