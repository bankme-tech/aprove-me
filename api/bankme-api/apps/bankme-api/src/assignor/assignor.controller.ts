import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListAssignorDto } from './dto/list-assignor.dto';

@Controller('assignor')
@ApiTags('Assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create an assignor',
    type: CreateAssignorDto,
  })
  create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'list all assignors',
    type: ListAssignorDto,
  })
  findAll() {
    return this.assignorService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get an assignor by id',
    type: CreateAssignorDto,
  })
  findOne(@Param('id') id: string) {
    return this.assignorService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Change an assignor by id',
    type: UpdateAssignorDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    return this.assignorService.update(+id, updateAssignorDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Remove an assignor by id',
    type: CreateAssignorDto,
  })
  remove(@Param('id') id: string) {
    return this.assignorService.remove(+id);
  }
}
