import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { ZodValidationPipe } from 'src/zod-validation/zod-validation.pipe';
import { z } from 'zod';
import {
  CreateAssignorDto,
  createAssignorSchema,
} from './dtos/create-assignor.dto';
import { uuidSchema } from 'src/common/zod';

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
    @Param('id', new ZodValidationPipe(uuidSchema))
    id: string,
  ) {
    return this.assignorService.findById(id);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ZodValidationPipe(uuidSchema)) id: string) {
    return this.assignorService.delete(id);
  }
}
