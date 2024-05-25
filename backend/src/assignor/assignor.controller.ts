import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AssignorService } from '../assignor/assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Controller('integrations/assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Get()
  @HttpCode(200)
  async getAllAssignors() {
    return this.assignorService.findAll();
  }

  @Post()
  @HttpCode(201)
  async createAssignor(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  @Get('/:id')
  async findAssignorById(@Param('id') id: string) {
    return this.assignorService.findOne(id);
  }

  @Patch('/:id')
  updateAssignor(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    return this.assignorService.update(id, updateAssignorDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  removeAssignor(@Param('id') id: string) {
    return this.assignorService.remove(id);
  }
}
