import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreatePayableDTO } from './dto/create-payable.dto';
import { IPayableService } from './interfaces/payable.service.interface';
import { PayableService } from './payable.service';
import { UpdatePayableDTO } from './dto/update-payable.dto';
import { IPayable } from './interfaces/payable.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('integrations/payable')
export class PayableController {
  constructor(
    @Inject(PayableService) private payableService: IPayableService,
  ) {}

  @Post()
  create(@Body() payable: CreatePayableDTO): Promise<CreatePayableDTO> {
    return this.payableService.create(payable);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() payable: UpdatePayableDTO,
  ): Promise<IPayable> {
    return this.payableService.update(id, payable);
  }

  @Get()
  findAll(): Promise<IPayable[]> {
    return this.payableService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<IPayable> {
    return this.payableService.findById(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.payableService.delete(id);
  }
}
