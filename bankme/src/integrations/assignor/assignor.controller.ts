import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import AssignorDto from '../dto/AssignorDto';
import Assignor from '../entity/Assignor';

@Controller('/integrations/assignor/')
export class AssignorController {
  constructor(private assignorService: AssignorService) {}

  @Post('/')
  async createPayableRegister(@Body() payableBody: AssignorDto) {
    const payable: Assignor = payableBody.toEntity();

    const responsePayable =
      await this.assignorService.createAssignorRegister(payable);

    return responsePayable;
  }

  @Get('/:id')
  async findAssignorById(@Param('id') id: string) {
    const assignor = await this.assignorService.findAssignorById(id);

    return assignor;
  }

  @Put('/:id')
  async updateAssignorById(
    @Param('id') id: string,
    @Body() assignorBody: AssignorDto,
  ) {
    const assignor: Assignor = assignorBody.toEntity();

    const responseAssignor = await this.assignorService.updateAssignorById(
      id,
      assignor,
    );

    return responseAssignor;
  }

  @Delete('/:id')
  async deleteAssignorById(@Param('id') id: string) {
    await this.assignorService.deleteAssignorById(id);

    return;
  }
}
