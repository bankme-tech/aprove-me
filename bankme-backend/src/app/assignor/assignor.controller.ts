import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAssignorDto, UpdateAssignorDto } from './dto/assignor.dto';
import { AssignorService } from './assignor.service';

@ApiBearerAuth()
@ApiTags('assignor')
@Controller('integrations')
export class AssignorController {
  constructor(private readonly service: AssignorService) {}

  /**
   * Create a new Assignor
   */
  @Post('assignor')
  async create(@Body() dto: CreateAssignorDto) {
    const createdAssignor = await this.service.createAssignor(dto);
    return createdAssignor;
  }

  /**
   * Returns list of Assignor
   */
  @Get('assignor')
  async findall() {
    const assignors = await this.service.getAllAssignor();
    return assignors;
  }

  /**
   *  Returns one Assignor by id
   */
  @Get('assignor/:id')
  async findOne(@Param('id') id: string) {
    const assignor = await this.service.getAssignorById(id);
    return assignor;
  }

  /**
   * Update one Assignor by id
   */
  @Patch('assignor/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateAssignorDto) {
    const updatedAssignor = await this.service.updateAssignor(id, dto);
    return updatedAssignor;
  }

  /**
   * Delete one Assignor by id
   */
  @Delete('assignor/:id')
  async remove(@Param('id') id: string) {
    return await this.service.deleteAssignor(id);
  }
}
