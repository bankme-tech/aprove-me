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
  UseGuards,
} from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('/assignor')
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  @Get('/:id')
  async getAssignorById(@Param('id') id: string) {
    const assignor = await this.assignorsService.getAssignorById(id);

    if (!assignor) throw new NotFoundException('Assignor not found');

    return this.assignorsService.getAssignorById(id);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateAssignor(
    @Param('id') id: string,
    @Body() assignorDto: UpdateAssignorDto,
  ) {
    return this.assignorsService.updateAssignor(id, assignorDto);
  }

  @Post()
  create(@Body() assignorDto: CreateAssignorDto) {
    return this.assignorsService.createAssignor(assignorDto);
  }

  @Delete('/:id')
  deleteAssignor(@Param('id') id: string) {
    return this.assignorsService.deleteAssignor(id);
  }
}
