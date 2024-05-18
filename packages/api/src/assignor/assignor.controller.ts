import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { AssignorService } from './assignor.service';

@Controller()
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post()
  async create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  @Get()
  async getAll() {
    return this.assignorService.getAll();
  }
}
