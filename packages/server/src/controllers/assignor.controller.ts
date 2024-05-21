import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AssignorService } from 'src/services/assignor.service';

@Controller('assignor')
export class AssignorController {
  private readonly assignorService: AssignorService;
  constructor(assignorService: AssignorService) {
    this.assignorService = assignorService;
  }

  @Get(':id')
  get_Assignor(id: string): Promise<any> {
    return this.assignorService.get_assignor(id);
  }
  @Get()
  get_list_Assignor(): Promise<any> {
    return this.assignorService.get_list_assignor();
  }
  @Delete(':id')
  delete_Assignor(id: string): Promise<any> {
    return this.assignorService.delete_assignor(id);
  }
  @Put()
  update_Assignor(@Body() id: string, assignor: any): Promise<any> {
    return this.assignorService.update_assignor(id, assignor);
  }

  @Post()
  create_Assignor(@Body() assignor: any): Promise<any> {
    return this.assignorService.create_assignor(assignor);
  }
}
