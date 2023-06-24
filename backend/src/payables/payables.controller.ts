import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpException } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Controller('integrations/payable')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Post()
  async create(@Body() payableData: CreatePayableDto) {
    const { value,assignorId} = payableData;
    return this.payablesService.create({
      value,
      assignor: {
        connect: { id: assignorId },
      },
    });
  }

  @Get()
  findAll() {
    return this.payablesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const payable = await this.payablesService.findOne({id});
    
    if (payable) {
      return payable;      
    }

    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
    return this.payablesService.update({
      where: { id },
      data: updatePayableDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const payableExist = await this.payablesService.checkIfExists({ id });
    if (payableExist) {
      return this.payablesService.remove({ id });
      
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
