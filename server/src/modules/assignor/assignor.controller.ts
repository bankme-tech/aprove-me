import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { ListAssignorRequestDto } from './dto/list-assignor.dto';

@Controller('assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}
 
  @Post()
  create(
    @Body() data: CreateAssignorDto
  ) {
    return this.assignorService.create({
      data
    });
  }
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignorService.findOne({
      id
    });
  }
 
  @Get()
  findAll(
    @Query() query: ListAssignorRequestDto
  ) {
    let { page = 1, itemsPerPage = 10 } = query
    const { email, name } = query


    return this.assignorService.findAll({
      filters: {
        email,
        name
      },
      page: Number(page),
      itemsPerPage: Number(itemsPerPage),
    });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateAssignorDto,
  ) {
    return this.assignorService.update({
      id,
      data
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string
  ) {
    await this.assignorService.remove({
      id,
    });

    return {
      message: 'Assignor deleted with success'
    }
  }
}
