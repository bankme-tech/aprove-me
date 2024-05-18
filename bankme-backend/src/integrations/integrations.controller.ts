import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PayableDto, UpdatePayableDto } from './dto/payable.dto';
import { CreateAssignorDto, UpdateAssignorDto } from './dto/assignor.dto';
import { IntegrationsService } from './integrations.service';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly service: IntegrationsService) {}

  @Post('payable')
  async payable(@Body() dto: PayableDto) {
    const createdPayable = await this.service.createPayable(dto);
    return createdPayable;
  }

  @Get('payable/:id')
  async findOnePayable(@Param('id') id: string) {
    const payable = await this.service.getPayableById(id);
    if (!payable) {
      throw new NotFoundException();
    }
    return payable;
  }

  @Patch('payable/:id')
  async updatePayable(@Param('id') id: string, @Body() dto: UpdatePayableDto) {
    const updatedAssignor = await this.service.updatedPayable(id, dto);
    return updatedAssignor;
  }

  @Delete('payable/:id')
  async deletePayable(@Param('id') id: string) {
    return await this.service.deletePayable(id);
  }

  // assignor

  @Post('assignor')
  async createAssignor(@Body() dto: CreateAssignorDto) {
    const createdAssignor = await this.service.createAssignor(dto);
    return createdAssignor;
  }

  @Get('assignor/:id')
  async findOneAssignor(@Param('id') id: string) {
    const assignor = await this.service.getAssignorById(id);
    if (!assignor) {
      throw new NotFoundException();
    }
    return assignor;
  }

  @Patch('assignor/:id')
  async updateAssignor(
    @Param('id') id: string,
    @Body() dto: UpdateAssignorDto,
  ) {
    const updatedAssignor = await this.service.updateAssignor(id, dto);
    return updatedAssignor;
  }

  @Delete('assignor/:id')
  async deleteAssignor(@Param('id') id: string) {
    return await this.service.deleteAssignor(id);
  }
}
