import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Controller('assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) { }

  @Post()
  create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  @Get()
  findAll() {
    return this.assignorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.assignorService.findOne(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    const result = await this.assignorService.update(id, updateAssignorDto);
    if (!result) throw new NotFoundException();
    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignorService.remove(+id);
  }
}
