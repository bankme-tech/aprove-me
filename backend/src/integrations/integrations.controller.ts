import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import {
  CreateAssignorDto,
  CreatePayableDto,
  UpdateAssignorDto,
  UpdatePayableDto,
} from './dto/create-integration.dto';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post('/payable')
  createPayable(@Body() payableDto: CreatePayableDto) {
    return this.integrationsService.createPayable(payableDto);
  }

  @Get('/payable/:id')
  async getPayableById(@Param('id') id: string) {
    const payable = await this.integrationsService.getPayableById(id);
    if (!payable) throw new NotFoundException('Payable not found');
    return payable;
  }

  @Put('/payable/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updatePayable(@Body() payableDto: UpdatePayableDto, @Param('id') id: string) {
    return this.integrationsService.updatePayable(id, payableDto);
  }

  @Delete('/payable/:id')
  deletePayable(@Param('id') id: string) {
    return this.integrationsService.deletePayable(id);
  }

  @Get('/assignor/:id')
  async getAssignorById(@Param('id') id: string) {
    const assignor = await this.integrationsService.getAssignorById(id);

    if (!assignor) throw new NotFoundException('Assignor not found');

    return this.integrationsService.getAssignorById(id);
  }

  @Put('/assignor/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateAssignor(
    @Param('id') id: string,
    @Body() assignorDto: UpdateAssignorDto,
  ) {
    return this.integrationsService.updateAssignor(id, assignorDto);
  }

  @Post('/assignor')
  create(@Body() assignorDto: CreateAssignorDto) {
    return this.integrationsService.createAssignor(assignorDto);
  }

  @Delete('/assignor/:id')
  deleteAssignor(@Param('id') id: string) {
    return this.integrationsService.deleteAssignor(id);
  }
}
