import { AddNewAssignor } from '@/app/use-cases/assignor/add-new-assignor';
import { FindAssignorById } from '@/app/use-cases/assignor/find-assignor-by-id';
import { CreateAssignorDTO } from '@/infra/http/dto/assignor/create-assignor.dto';
import { ParamId } from '@/utils/param-id';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('/assignor')
export class AssignorController {
  constructor(
    private addNewAssignor: AddNewAssignor,
    private findAssignorById: FindAssignorById,
    private editAssignor: EditAssignor,
  ) {}

  @Post()
  async create(@Body() body: CreateAssignorDTO) {
    const { newAssignor } = await this.addNewAssignor.execute(body);
    return newAssignor;
  }

  @Get(':assignorId')
  async findById(@ParamId('assignorId') assignorId: string) {
    const { assignor } = await this.findAssignorById.execute({ assignorId });

    return assignor;
  }

  @Put(':assignorId')
  async edit(
    @ParamId('assignorId') assignorId: string,
    @Body() body: EditAssignorDTO,
  ) {
    const { assignor } = await this.editAssignor.execute({
      ...body,
      assignorId,
    });

    return assignor;
  }
}
