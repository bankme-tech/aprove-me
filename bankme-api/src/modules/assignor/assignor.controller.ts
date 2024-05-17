import {Controller, Get, Param } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/assignor.dto';


@Controller('integrations/assignor')
export class AssignorController {
  constructor(private service: AssignorService) {}

  @Get()
  findAll(): Promise<CreateAssignorDto []> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param() params: any) {
    const id = Number(params.id);

    return this.service.findById(id);
  }
}
