import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { ZodValidationPipe } from '../zod-validation/zod-validation.pipe';
import {
  CreateAssignorDto,
  createAssignorSchema,
  UpdateAssignorDto,
  updateAssignorSchema,
} from './dto';
import { uuidSchema } from '../common/zod';
import { AuthGuard } from '../auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.assignorService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(
    @Param('id', new ZodValidationPipe(uuidSchema))
    id: string,
  ) {
    return this.assignorService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ZodValidationPipe(uuidSchema)) id: string) {
    return this.assignorService.delete(id);
  }

  @UseGuards(AuthGuard)
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
