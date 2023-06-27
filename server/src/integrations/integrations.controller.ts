import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { PayableDto } from '../dtos/payable.dto';
import { transformAndValidate } from 'class-transformer-validator';
import { ReceivableDto, UpdateReceivableDto } from '../dtos/receivable.dto';
import { AssignorDto, UpdateAssignorDto } from '../dtos/assignor.dto';
import { AuthMiddleware } from 'src/authentication/auth.middleware';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post('payable')
  @UseGuards(AuthMiddleware)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPayable(@Body() payable: PayableDto): Promise<PayableDto> {
    await transformAndValidate(PayableDto, payable);
    return this.integrationsService.createPayable(payable);
  }

  @Get('payable')
  @UseGuards(AuthMiddleware)
  async getAllPayable(): Promise<ReceivableDto[]> {
    return this.integrationsService.getAllPayable();
  }

  @Get('payable/:id')
  @UseGuards(AuthMiddleware)
  async getPayable(@Param('id') id?: string): Promise<ReceivableDto> {
    return this.integrationsService.getPayable(id);
  }

  @Get('assignor/:id')
  @UseGuards(AuthMiddleware)
  async getAssignor(@Param('id') id: string): Promise<AssignorDto> {
    return this.integrationsService.getAssignor(id);
  }

  @Patch('payable/:id')
  @UseGuards(AuthMiddleware)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateReceivable(
    @Param('id') id: string,
    @Body() receivableData: UpdateReceivableDto,
  ): Promise<UpdateReceivableDto> {
    await transformAndValidate(UpdateReceivableDto, receivableData);
    return this.integrationsService.updateReceivable(id, receivableData);
  }

  @Patch('assignor/:id')
  @UseGuards(AuthMiddleware)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateAssignor(
    @Param('id') id: string,
    @Body() assignorData: UpdateAssignorDto,
  ): Promise<UpdateAssignorDto> {
    await transformAndValidate(UpdateAssignorDto, assignorData);
    return this.integrationsService.updateAssignor(id, assignorData);
  }

  @Delete('payable/:id')
  @UseGuards(AuthMiddleware)
  async deleteReceivable(@Param('id') id: string): Promise<ReceivableDto> {
    return this.integrationsService.deleteReceivable(id);
  }

  @Delete('assignor/:id')
  @UseGuards(AuthMiddleware)
  async deleteAssignor(@Param('id') id: string): Promise<AssignorDto> {
    return this.integrationsService.deleteAssignor(id);
  }
}
