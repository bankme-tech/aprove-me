import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { NotFound, UnprocessableEntity } from 'src/shared/domain/errors';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PayableService } from './payable.service';

@Controller('payable')
@UseGuards(JwtAuthGuard)
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  async create(@Body() createPayableDto: CreatePayableDto) {
    const result = await this.payableService.create(createPayableDto);
    if (!result)
      throw new UnprocessableEntityException(
        `The provided assignor ${createPayableDto.assignorId} doesn't exists`,
      );
    return result;
  }

  @Get()
  findAll() {
    return this.payableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const result = this.payableService.findOne(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDto,
  ) {
    const result = await this.payableService.update(id, updatePayableDto);
    if (result.isLeft() && result.value instanceof NotFound) {
      throw new NotFoundException();
    }
    if (result.isLeft() && result.value instanceof UnprocessableEntity) {
      throw new UnprocessableEntityException(
        `The provided assignor ${updatePayableDto.assignorId} doesn't exists`,
      );
    }
    return result.value;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const result = await this.payableService.remove(id);
    if (!result) throw new NotFoundException();
    return;
  }
}
