import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import Assignor from '../entity/Assignor';
import AssignorCreationDto from '../dto/AssignorCreationDto';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('/integrations/assignor/')
export class AssignorController {
  constructor(private assignorService: AssignorService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  async createAssignorRegister(@Body() assignorBody: AssignorCreationDto) {
    const assignor: Assignor = assignorBody.toEntity();

    const responseAssignor =
      await this.assignorService.createAssignorRegister(assignor);

    return responseAssignor;
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findAssignorById(@Param('id') id: string) {
    const assignor = await this.assignorService.findAssignorById(id);

    return assignor;
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  async deleteAssignorById(@Param('id') id: string) {
    await this.assignorService.deleteAssignorById(id);

    return;
  }
}
