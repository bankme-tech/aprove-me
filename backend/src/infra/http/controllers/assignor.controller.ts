import { AddNewAssignor } from '@/app/use-cases/assignor/add-new-assignor';
import { EditAssignor } from '@/app/use-cases/assignor/edit-assignor';
import { FindAssignorById } from '@/app/use-cases/assignor/find-assignor-by-id';
import { CreateAssignorDTO } from '@/infra/http/dto/assignor/create-assignor.dto';
import { ParamId } from '@/utils/param-id';
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { EditAssignorDTO } from '@/infra/http/dto/assignor/edit-assignor.dto';
import { DeleteAssignor } from '@/app/use-cases/assignor/delete-assignor';
import { FindAllAssingors } from '@/app/use-cases/assignor/find-all';

@Controller('/assignor')
export class AssignorController {
  constructor(
    private addNewAssignor: AddNewAssignor,
    private findAllAssignors: FindAllAssingors,
    private findAssignorById: FindAssignorById,
    private editAssignor: EditAssignor,
    private deleteAssignor: DeleteAssignor,
  ) { }

  @Post()
  async create(@Body() body: CreateAssignorDTO) {
    const { newAssignor } = await this.addNewAssignor.execute(body);
    return newAssignor;
  }

  @Get()
  async findAll() {
    const { assignors } = await this.findAllAssignors.execute();

    return { assignors };
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

  @Delete(':assignorId')
  async delete(@ParamId('assignorId') assignorId: string) {
    await this.deleteAssignor.execute({ assignorId });
  }
}
