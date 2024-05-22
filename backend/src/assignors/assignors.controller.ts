import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { CreateAssignorDto } from './dto/create-assignor.dto';

@Controller('assignors')
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  @Get('/assignor/:id')
  async getAssignorById(@Param('id') id: string) {
    const assignor = await this.assignorsService.getAssignorById(id);

    if (!assignor) throw new NotFoundException('Assignor not found');

    return this.assignorsService.getAssignorById(id);
  }

  @Put('/assignor/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateAssignor(
    @Param('id') id: string,
    @Body() assignorDto: UpdateAssignorDto,
  ) {
    return this.assignorsService.updateAssignor(id, assignorDto);
  }

  @Post('/assignor')
  create(@Body() assignorDto: CreateAssignorDto) {
    return this.assignorsService.createAssignor(assignorDto);
  }

  @Delete('/assignor/:id')
  deleteAssignor(@Param('id') id: string) {
    return this.assignorsService.deleteAssignor(id);
  }
}
