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
import Assignor from '../entity/Assignor';
import AssignorCreationDto from '../dto/AssignorCreationDto';

@Controller('/integrations/assignor/')
export class AssignorController {
  constructor(private assignorService: AssignorService) {}

  @Post('/')
  async createAssignorRegister(@Body() assignorBody: AssignorCreationDto) {
    const assignor: Assignor = assignorBody.toEntity();

    const responseAssignor =
      await this.assignorService.createAssignorRegister(assignor);

    return responseAssignor;
  }

  @Get('/:id')
  async findAssignorById(@Param('id') id: string) {
    const assignor = await this.assignorService.findAssignorById(id);

    return assignor;
  }

  @Put('/:id')
  async updateAssignorById(
    @Param('id') id: string,
    @Body() assignorBody: AssignorCreationDto,
  ) {
    const assignor = assignorBody.toEntity();

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
