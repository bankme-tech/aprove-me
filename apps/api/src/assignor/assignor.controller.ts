import { Controller, Get, Param } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { ZodValidationPipe } from 'src/zod-validation/zod-validation.pipe';
import { z } from 'zod';

@Controller('/integrations/assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}
  @Get(':id')
  findById(
    @Param('id', new ZodValidationPipe(z.string().uuid()))
    id: string,
  ) {
    return this.assignorService.findById(id);
  }
}
