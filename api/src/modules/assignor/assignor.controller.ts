import { Body, Controller, Post } from '@nestjs/common';
import { CreateAssignorDTO } from './dto/create-assignor.dto';

@Controller('integrations/assignor')
export class AssignorController {
  @Post()
  create(@Body() assignor: CreateAssignorDTO) {
    Promise.resolve(assignor);
  }
}
