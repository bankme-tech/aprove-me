import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { AssignorEntity } from './entities/assignor.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('assignors')
@ApiTags('assignors')
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  @Post()
  @ApiCreatedResponse({ type: AssignorEntity })
  async create(@Body() createAssignorDto: CreateAssignorDto) {
    return new AssignorEntity(
      await this.assignorsService.create(createAssignorDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: AssignorEntity, isArray: true })
  async findAll() {
    const assignors = await this.assignorsService.findAll();
    return assignors.map((assignor) => new AssignorEntity(assignor));
  }

  @Get(':id')
  @ApiOkResponse({ type: AssignorEntity })
  async findOne(@Param('id') id: string) {
    return new AssignorEntity(await this.assignorsService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: AssignorEntity })
  async update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    return new AssignorEntity(
      await this.assignorsService.update(id, updateAssignorDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: AssignorEntity })
  async remove(@Param('id') id: string) {
    return new AssignorEntity(await this.assignorsService.remove(id));
  }
}
