import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { CreateAssignorDto } from 'src/assignor/dto/create-assignor.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { UUID } from 'crypto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PayableEntity } from './payable.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BatchService } from 'src/batch/batch.service';

@ApiTags('payable')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('integrations/payable')
export class PayableController {
  constructor(
    private readonly payableService: PayableService,
    private readonly batchService: BatchService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: PayableEntity })
  createPayable(
    @Body('payable') payable: CreatePayableDto,
    @Body('assignor') assignor: CreateAssignorDto,
  ) {
    return this.payableService.create(payable, assignor);
  }

  @Get()
  @ApiOkResponse({ type: PayableEntity })
  findAll() {
    return this.payableService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PayableEntity })
  findOne(@Param('id') id: UUID) {
    this.batchService.sendToQueue();
    return this.payableService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: UUID) {
    return this.payableService.remove(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PayableEntity })
  update(@Param('id') id: UUID, @Body() updatePayable: UpdatePayableDto) {
    return this.payableService.update(id, updatePayable);
  }
}
