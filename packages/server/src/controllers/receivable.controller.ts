import { throw_error } from 'src/shared/utils';
import { ReceivableService } from '../services/receivable.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
// import { InjectQueue } from '@nestjs/bull';
// import { Queue } from 'bull';

@Controller('integrations/payble')
export class ReceivableController {
  private readonly receivableService: ReceivableService;
  constructor(
    receivableService: ReceivableService,
    // @InjectQueue('receivables') private readonly receivablesQueue: Queue,
  ) {
    this.receivableService = receivableService;
  }

  @Get(':id')
  async get_receivable(id: string): Promise<any> {
    const result = await this.receivableService.get_receivable(id);
    if (result.isError()) {
      return throw_error(result.value);
    }
    return result.value;
  }
  @Get()
  async get_list_receivable(): Promise<any> {
    const result = await this.receivableService.get_list_receivable();
    if (result.isError()) {
      return throw_error(result.value);
    }
    return result.value;
  }
  @Delete(':id')
  async delete_receivable(@Param('id') id: string): Promise<any> {
    const result = await this.receivableService.delete_receivable(id);
    if (result.isError()) {
      return throw_error(result.value);
    }
    return result.value;
  }
  @Put(':id')
  async update_receivable(@Param('id') id: string, @Body() receivable: any): Promise<any> {
    const result = await this.receivableService.update_receivable(id, receivable);
    if (result.isError()) {
      return throw_error(result.value);
    }
    return result.value;
  }

  @Post()
  async create_receivable(@Body() receivable: any): Promise<any> {
    const result = await this.receivableService.create_receivable(receivable);
    if (result.isError()) {
      return throw_error(result.value);
    }
    return result.value;
  }

  // @Post('batch')
  // async createBatch(@Body() createReceivableDtos: any[]) {
  //   if (createReceivableDtos.length > 10000) {
  //     throw new Error('Batch size exceeds the limit of 10,000 receivables');
  //   }
  //   await this.receivablesQueue.add(createReceivableDtos);
  //   return { message: 'Batch processing initiated' };
  // }
}
