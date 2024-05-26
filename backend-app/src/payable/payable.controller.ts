import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { Response } from 'express';

// CRUD gerado com o comando "nest g resource payable".
/**Camada de controle da rota 'integrations/payable'. Inclui CRUD completo. */
@Controller('integrations')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  /**Cadastra novo recebível no bando de dados. */
  @Post('payable')
  create(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }

  /**Retorna todos os recebíveis registrados no banco de dados. */
  @Get('payable')
  findAll() {
    return this.payableService.findAll();
  }

  /**Busca um recebível pelo id e retorna seus dados. */
  @Get('payable/:id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const { status, body } = await this.payableService.findOne(id);
    return response.status(status).json(body);
  }

  /**Altera os dados de um recebível no banco de dados pelo id. */
  @Patch('payable/:id')
  update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
    return this.payableService.update(id, updatePayableDto);
  }

  /**Busca e deleta um recebível pelo id. */
  @Delete('payable/:id')
  remove(@Param('id') id: string) {
    return this.payableService.remove(id);
  }
}
