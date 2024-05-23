import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseGuards,
  HttpCode,
  Query
} from '@nestjs/common';
import { ReceivableService } from '../services/receivable.service';
import { AssignorService } from '../services/assignor.service';
import { UUID } from 'crypto';
import { Receivable as ReceivableModel } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { ReceivableDto } from 'src/dtos/receivable.dto';
import { AssignorDto } from 'src/dtos/assignor.dto';
import { CreateReceivableDto } from 'src/dtos/createReceivable.dto';

@UseGuards(AuthGuard)
@Controller('/integrations/payable')
export class ReceivableController {
  constructor(
    private readonly assignorService: AssignorService,
    private readonly receivableService: ReceivableService,
    @InjectQueue('payables')
    private readonly queue: Queue
  ) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() data: CreateReceivableDto
  ): Promise<ReceivableModel> {
    const receivableData: ReceivableDto = data.receivableData;
    const assignorData: AssignorDto = data.assignorData;
    console.log(receivableData, assignorData)
    let assignorId: UUID;

    // Se o assignor ainda não existe, cria um novo
    if (assignorData) {
      const assignor = await this.assignorService.createAssignor(assignorData);
      assignorId = assignor.id as UUID;
    }
    // Se o assignor já existe e o id dele não foi passado
    else if (!receivableData.assignor) {
      throw new HttpException('Either Assignor data or an Assignor ID is required.', HttpStatus.BAD_REQUEST);
    }
    // Se o assignor já existe, pega o id dele
    else {
      assignorId = receivableData.assignor;
    }

    // Verifica se existe o assignor com esse id
    const assignor = await this.assignorService.assignor({ id: assignorId });
    if(!assignor) {
      throw new HttpException('Assignor not found', HttpStatus.NOT_FOUND);
    }

    return this.receivableService.createReceivable({
      value: receivableData.value,
      emissionDate: new Date(receivableData.emissionDate),
      assignorRef: {
        connect: {
          id: assignorId
        }
      }
    });
  }

  @Get(':id')
  async getReceivable(@Param('id') id: UUID): Promise<ReceivableModel> {
    const receivable = await this.receivableService.receivable({ id });
    if (!receivable) {
      throw new HttpException('Receivable not found', HttpStatus.NOT_FOUND);
    }
    return receivable;
  }

  @Get()
  async getAllReceivables(
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('orderDate') orderDate: "asc" | "desc"
  ): Promise<ReceivableModel[]> {
    return this.receivableService.receivables({
      skip: +skip,
      take: +take,
      orderBy: {
        emissionDate: orderDate
      }
    });
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: UUID, @Body() receivableData: ReceivableDto
  ): Promise<ReceivableModel> {
    // verifica se o recebível existe
    const receivable = await this.receivableService.receivable({ id });
    if (!receivable) {
      throw new HttpException('Receivable not found', HttpStatus.NOT_FOUND);
    }

    const { value, emissionDate } = receivableData;

    return this.receivableService.updateReceivable({
      where: { id },
      data: {
        value,
        emissionDate: new Date(emissionDate),
      }
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: UUID): Promise<ReceivableModel> {
    const receivable = await this.receivableService.receivable({ id });
    if (!receivable) {
      throw new HttpException('Receivable not found', HttpStatus.NOT_FOUND);
    }

    return await this.receivableService.deleteReceivable({ id });
  }

  @Post('/batch')
  @HttpCode(204)
  async createBatch(@Body() payables: { receivableData: ReceivableDto, assignorData?: AssignorDto }[]): Promise<void> {
    if (payables.length > 10000) {
      throw new Error('Too many payables in batch');
    }
    // add payables to a queue
    for (const payable of payables) {
      this.queue.add('process-receivable', payable);
    }
  }
}