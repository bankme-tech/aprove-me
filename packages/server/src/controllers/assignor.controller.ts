import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AssignorService } from 'src/services/assignor.service';
import { throw_error } from 'src/shared/utils';

@Controller('integrations/assignor')
export class AssignorController {
  private readonly assignorService: AssignorService;
  constructor(assignorService: AssignorService) {
    this.assignorService = assignorService;
  }

  @Get(':id')
  async get_Assignor(@Param('id') id: string): Promise<any> {
    const result = await this.assignorService.get_assignor(id);
    if (result.isError()) {
      return throw_error(result.value);
    }
    return result.value;
  }
  @Get()
  async get_list_Assignor(): Promise<any> {
    const result = await this.assignorService.get_list_assignor();
    if (result.isError()) {
      return throw_error(result.value);
    }
    return result.value;
  }
  @Delete(':id')
  async delete_Assignor(@Param('id') id: string): Promise<any> {
    const result = await this.assignorService.delete_assignor(id);
    if (result.isError()) {
      return throw_error(result.value);
    }
  }
  @Put(':id')
  async update_Assignor(@Param('id') id: string, @Body() assignor: any): Promise<any> {
    const result = await this.assignorService.update_assignor(id, assignor);
    if (result.isError()) {
      return throw_error(result.value);
    }
    return result.value;
  }

  @Post()
  async create_Assignor(@Body() assignor: any): Promise<any> {
    const result = await this.assignorService.create_assignor(assignor);
    if (result.isError()) {
      return throw_error(result.value);
    }
    return result.value;
  }
}
