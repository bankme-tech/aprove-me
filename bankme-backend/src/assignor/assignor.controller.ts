import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateAssignorDto, UpdateAssignorDto } from './dto/assignor.dto';
import { AssignorService } from './assignor.service';

@Controller('integrations')
export class AssignorController {
  constructor(private readonly service: AssignorService) {}

  @Post('assignor')
  async create(@Body() dto: CreateAssignorDto) {
    const createdAssignor = await this.service.createAssignor(dto);
    return createdAssignor;
  }

  @Get('assignor/:id')
  async findOne(@Param('id') id: string) {
    const assignor = await this.service.getAssignorById(id);
    return assignor;
  }

  @Patch('assignor/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAssignorDto,
  ) {
    const updatedAssignor = await this.service.updateAssignor(id, dto);
    return updatedAssignor;
  }

  @Delete('assignor/:id')
  async remove(@Param('id') id: string) {
    return await this.service.deleteAssignor(id);
  }
}
