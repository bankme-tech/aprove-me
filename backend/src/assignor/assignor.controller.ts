import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { CreateAssignorDto } from './dto/create-assignor.dto';

@Controller('integrations/assignor')
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
  async update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    return this.assignorService.update(id, updateAssignorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.assignorService.remove(id);
    return { message: 'Assignor deleted' };
  }
}
