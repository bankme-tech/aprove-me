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
  HttpCode
} from '@nestjs/common';
import { ReceivableService } from '../services/receivable.service';
import { AssignorService } from '../services/assignor.service';
import { UUID } from 'crypto';
import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
import { Receivable as ReceivableModel } from '@prisma/client';
import { Assignor } from './assignor.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { Job, Queue } from 'bull';
import { InjectQueue, Process, Processor } from '@nestjs/bull';

export class Receivable {
  id: UUID

  @IsNotEmpty()
  @IsNumber()
  value: number

  @IsNotEmpty()
  @IsDateString()
  emissionDate: Date

  assignor: UUID
}

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
    @Body() data: { receivableData: Receivable, assignorData?: Assignor }
  ): Promise<ReceivableModel> {
    const receivableData: Receivable = data.receivableData;
    const assignorData: Assignor = data.assignorData;

    let assignorId: UUID;

    // Se o assignor ainda não existe, cria um novo
    if (assignorData) {
      const assignor = await this.assignorService.createAssignor(assignorData);
      assignorId = assignor.id as UUID;
    }
    // Se o assignor já existe e o id dele não foi passado
    else if (!receivableData.assignor) {
      throw new Error('Assignor data is required');
    }
    // Se o assignor já existe, pega o id dele
    else {
      assignorId = receivableData.assignor;
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
  async getAllReceivables(): Promise<ReceivableModel[]> {
    return this.receivableService.receivables({});
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: UUID, @Body() receivableData: Receivable
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
  async createBatch(@Body() payables: { receivableData: Receivable, assignorData?: Assignor }[]): Promise<void> {
    if (payables.length > 10000) {
      throw new Error('Too many payables in batch');
    }
    // add payables to a queue
    for (const payable of payables) {
      console.log('Add payable to queue',payable)
      this.queue.add('process-receivable', payable);
    }
  }
}