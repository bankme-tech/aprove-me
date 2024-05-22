import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { ZodValidationPipe } from '../zod-validation/zod-validation.pipe';
import {
  CreateAssignorDto,
  createAssignorSchema,
} from './dto/create-assignor.dto';
import {
  UpdateAssignorDto,
  updateAssignorSchema,
} from './dto/update-assignor.dto';
import { uuidSchema } from '../common/zod';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/integrations/assignor')
@UseGuards(AuthGuard)
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}
  @Post()
  create(
    @Body(new ZodValidationPipe(createAssignorSchema))
    createAssignorDto: CreateAssignorDto,
    @Request()
    request,
  ) {
    const userId = request.user.id;
    return this.assignorService.create({ userId, ...createAssignorDto });
  }

  @Get()
  findAll(@Request() request) {
    const userId = request.user.id;
    return this.assignorService.findAll(userId);
  }

  @Get(':id')
  findById(
    @Param('id', new ZodValidationPipe(uuidSchema))
    id: string,
    @Request()
    request,
  ) {
    const userId = request.user.id;
    return this.assignorService.findById({ id, userId });
  }

  @Delete(':id')
  @HttpCode(204)
  delete(
    @Param('id', new ZodValidationPipe(uuidSchema))
    id: string,
    @Request()
    request,
  ) {
    const userId = request.user.id;
    return this.assignorService.delete({ id, userId });
  }

  @Patch(':id')
  update(
    @Param('id', new ZodValidationPipe(uuidSchema))
    id: string,
    @Body(new ZodValidationPipe(updateAssignorSchema))
    updateAssignorDto: UpdateAssignorDto,
    @Request()
    request,
  ) {
    const userId = request.user.id;
    return this.assignorService.update({ id, userId, ...updateAssignorDto });
  }
}
