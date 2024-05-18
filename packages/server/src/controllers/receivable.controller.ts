import { ReceivableService } from '../services/receivable.service';
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller()
export class ReceivableController {
  private readonly receivableService: ReceivableService;
  constructor(receivableService: ReceivableService) {
    this.receivableService = receivableService;
  }

  @Get(':id')
  get_receivable(id: string): Promise<any> {
    return this.receivableService.get_receivable(id);
  }
  @Get()
  get_list_receivable(): Promise<any> {
    return this.receivableService.get_list_receivable();
  }
  @Delete(':id')
  delete_receivable(id: string): Promise<any> {
    return this.receivableService.delete_receivable(id);
  }
  @Put()
  update_receivable(@Body() id: string, receivable: any): Promise<any> {
    return this.receivableService.update_receivable(id, receivable);
  }

  @Post()
  create_receivable(@Body() receivable: any): Promise<any> {
    return this.receivableService.create_receivable(receivable);
  }
}
