import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateAssignorDTO } from './dto/create-assignor.dto';
import { IAssignor } from './interfaces/assignor.interface';
import { AssignorService } from './assignor.service';
import { IAssignorService } from './interfaces/assignor-service.interface';

@Controller('integrations/assignor')
export class AssignorController {
  constructor(
    @Inject(AssignorService) private readonly assignorService: IAssignorService,
  ) {}

  @Post()
  create(@Body() assignor: CreateAssignorDTO): Promise<IAssignor> {
    return this.assignorService.create(assignor);
  }
}
