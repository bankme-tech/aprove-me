import { Controller, Post,Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CreateAssignorBody } from './dtos/create-assignor-body';
import { CreatePayableAssignorBody } from './dtos/create-payable-assignor-body';
import { CreatePayableBody } from './dtos/create-payable-body';
import { UpdateAssignor } from './dtos/update-assignor';
import { UpdatePayable } from './dtos/update-payable';
import { AssignorRepository } from './repositories/assignor-repository';
import { PayableRepository } from './repositories/payable-repository';

@Controller('integrations')
export class IntegrationsController {
  constructor(
    private assignorRepository: AssignorRepository, 
    private payableRepository: PayableRepository
    ) { }

    
    @Post('payable')
    async payable(@Body() body: CreatePayableAssignorBody) {
      return  await this.payableRepository.payable(body);
    }
    
    @Post('addAssignor')
    async addAssignor(@Body() body: CreateAssignorBody) {
      return  await this.assignorRepository.addAssignor(body);
    }
    
    @Post('addPayable')
    async addPayable(@Body() body: CreatePayableBody) {
      return  await this.payableRepository.addPayable(body);
    }

    @Get('payable/:id')
    async getPayable(@Param() params) {
      return  await this.payableRepository.getPayable(params.id);
    }

    @Get('payableAll')
    async payableAll() {
      return  await this.payableRepository.getpayableAll();
    }

    @Get('assignor/:id')
    async getAssignor(@Param() params) {
      return  await this.assignorRepository.getAssignor(params.id);
    }

    @Get('assignorAll')
    async assignorAll() {
      return  await this.assignorRepository.getAssignorAll();
    }

    @Put('payable/:id')
    async updatePayable(@Param() params, @Body() body: UpdatePayable) {
      return  await this.payableRepository.updatePayable(params.id, body);
    }

    @Put('assignor/:id')
    async updateAssignor(@Param() params, @Body() body: UpdateAssignor) {
      return  await this.assignorRepository.updateAssignor(params.id, body);
    }

  @Delete('payable/:id')
  async deletePayable(@Param() params) {
    return  await this.payableRepository.deletePayable(params.id);
  }

  @Delete('assignor/:id')
  async deleteAssignor(@Param() params) {
    return  await this.assignorRepository.deleteAssignor(params.id);
  }
}