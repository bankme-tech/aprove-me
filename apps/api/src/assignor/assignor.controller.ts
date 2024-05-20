import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { ZodValidationPipe } from 'src/zod-validation/zod-validation.pipe';
import { z } from 'zod';
import {
  CreateAssignorDto,
  createAssignorSchema,
} from './dtos/create-assignor.dto';

@Controller('/integrations/assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}
  @Post()
  create(
    @Body(new ZodValidationPipe(createAssignorSchema))
    createAssignorDto: CreateAssignorDto,
  ) {
    return this.assignorService.create(createAssignorDto);
  }

  @Get(':id')
  findById(
    @Param('id', new ZodValidationPipe(z.string().uuid()))
    id: string,
  ) {
    return this.assignorService.findById(id);
  }
}
