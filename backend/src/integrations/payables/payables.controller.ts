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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PayableEntity } from './entities/payable.entity';

@ApiBearerAuth()
@Controller('payables')
@ApiTags('payables')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Post()
  @ApiCreatedResponse({ type: PayableEntity })
  async create(@Body() createPayableDto: CreatePayableDto) {
    return new PayableEntity(
      await this.payablesService.create(createPayableDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: PayableEntity, isArray: true })
  async findAll() {
    const payables = await this.payablesService.findAll();
    return payables.map((payable) => new PayableEntity(payable));
  }

  @Get(':id')
  @ApiOkResponse({ type: PayableEntity })
  async findOne(@Param('id') id: string) {
    return new PayableEntity(await this.payablesService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: PayableEntity })
  async update(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDto,
  ) {
    return new PayableEntity(
      await this.payablesService.update(id, updatePayableDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: PayableEntity })
  async remove(@Param('id') id: string) {
    return new PayableEntity(await this.payablesService.remove(id));
  }

  @Post('batch')
  @ApiOkResponse()
  async batchCreate(@Body() createPayableDto: CreatePayableDto[]) {
    return this.payablesService.batchCreate(createPayableDto);
  }
}
