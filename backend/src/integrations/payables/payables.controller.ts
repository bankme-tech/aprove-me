import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PayablesService } from './payables.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PayableEntity } from './entities/payable.entity';

@Controller('payables')
@ApiTags('payables')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Post()
  @ApiCreatedResponse({ type: PayableEntity })
  create(@Body() createPayableDto: CreatePayableDto) {
    return this.payablesService.create(createPayableDto);
  }

  @Get()
  @ApiOkResponse({ type: PayableEntity, isArray: true })
  findAll() {
    return this.payablesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PayableEntity })
  findOne(@Param('id') id: string) {
    return this.payablesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PayableEntity })
  update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
    return this.payablesService.update(id, updatePayableDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PayableEntity })
  remove(@Param('id') id: string) {
    return this.payablesService.remove(id);
  }
}
