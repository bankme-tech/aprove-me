import { Controller, Get, Param } from '@nestjs/common';
import { AssignorService } from './assignor.service';

@Controller('/integrations/assignor/')
export class AssignorController {
  constructor(private assignorService: AssignorService) {}

  @Get('/:id')
  async findAssignorById(@Param('id') id: string) {
    const assignor = await this.assignorService.findAssignorById(id);

    return assignor;
  }
}
