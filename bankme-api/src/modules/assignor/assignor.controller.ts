import {Controller, Get } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/assignor.dto';


@Controller('integrations/assignor')
export class AssignorController {
  constructor(private service: AssignorService) {}

  @Get()
  findAll(): Promise<CreateAssignorDto []> {
    return this.service.findAll();
  }
}
