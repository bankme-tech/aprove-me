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
import { AssignorService } from './assignor.service';
import { ZodValidationPipe } from '../zod-validation/zod-validation.pipe';
import {
  CreateAssignorDto,
  createAssignorSchema,
  UpdateAssignorDto,
  updateAssignorSchema,
} from './dtos';
import { uuidSchema } from '../common/zod';

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

  @Patch(':id')
  update(
    @Param('id', new ZodValidationPipe(uuidSchema))
    id: string,
    @Body(new ZodValidationPipe(updateAssignorSchema))
    updateAssignorDto: UpdateAssignorDto,
  ) {
    return this.assignorService.update(id, updateAssignorDto);
  }
}
