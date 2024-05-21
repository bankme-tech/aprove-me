import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AssignorService } from 'src/services/assignor.service';
import { CustomError } from 'src/validations/errors';
import { ZodError } from 'zod';

@Controller('assignor')
export class AssignorController {
  private readonly assignorService: AssignorService;
  constructor(assignorService: AssignorService) {
    this.assignorService = assignorService;
  }

  @Get(':id')
  async get_Assignor(id: string): Promise<any> {
    const result = await this.assignorService.get_assignor(id);
    if (result.isError()) {
      if (result.value instanceof ZodError) {
        throw new BadRequestException(result.value.issues[0].message);
      }

      throw new InternalServerErrorException('Internal Server Error');
    }
    return result.value;
  }
  @Get()
  async get_list_Assignor(): Promise<any> {
    const result = await this.assignorService.get_list_assignor();
    if (result.isError()) {
      if (result.value instanceof ZodError) {
        throw new BadRequestException(result.value.issues[0].message);
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
    return result.value;
  }
  @Delete(':id')
  async delete_Assignor(@Param('id') id: string): Promise<any> {
    const result = await this.assignorService.delete_assignor(id);
    if (result.isError()) {
      if (result.value instanceof ZodError) {
        throw new BadRequestException(result.value.issues[0].message);
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
    return result.value;
  }
  @Put(':id')
  async update_Assignor(@Param('id') id: string, @Body() assignor: any): Promise<any> {
    const result = await this.assignorService.update_assignor(id, assignor);
    if (result.isError()) {
      if (result.value instanceof ZodError) {
        throw new BadRequestException(result.value.issues[0].message);
      }

      throw new InternalServerErrorException('Internal Server Error');
    }
    return result.value;
  }

  @Post()
  async create_Assignor(@Body() assignor: any): Promise<any> {
    const result = await this.assignorService.create_assignor(assignor);
    if (result.isError()) {
      if (result.value instanceof ZodError) {
        throw new BadRequestException(result.value.issues[0].message);
      }
      if (result.value instanceof CustomError) {
        throw new BadRequestException(result.value.message);
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
    return result.value;
  }
}
