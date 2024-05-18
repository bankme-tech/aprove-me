import { Body, Controller, Post } from '@nestjs/common';
import { AddNewAssignor } from '@/app/use-cases/assignor/add-new-assignor';
import { CreateAssignorDTO } from '@/infra/http/dto/payable/create-assignor.dto';

@Controller('assignor')
export class PayableController {
  constructor(private addNewAssignor: AddNewAssignor) {}

  @Post()
  async create(@Body() body: CreateAssignorDTO) {
    const { newAssignor } = await this.addNewAssignor.execute(body);
    return newAssignor;
  }
}
