import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller()
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post()
  async create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  @Get()
  async findAll() {
    return this.assignorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.assignorService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAssignorDto: UpdateAssignorDto) {
    return this.assignorService.update(id, updateAssignorDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.assignorService.remove(id);
    return { message: 'Assignor deleted' };
  }
}
