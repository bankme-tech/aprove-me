import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  async create(@Body() createPayableDto: CreatePayableDto) {
    return await this.payableService.create(createPayableDto);
  }

  @Get()
  async findAll() {
    return await this.payableService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.payableService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDto,
  ) {
    return await this.payableService.update(id, updatePayableDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.payableService.remove(id);
  }

  // @Post('batch')
  // async batchCreate(@Body() payables: CreatePayableDto[]) {
  //   return await this.payableService.batchCreate(payables);
  // }
}
