import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Payable } from '@prisma/client';
import Bull from 'bull';
import { JwtPayload } from 'src/types/jwt-payload.types';
import { AuthGuard } from '../auth/auth.guard';
import { CrudStrategyController } from '../crud-strategy/crud-strategy.controller';
import {
  PayableNoBaseModel,
  PayableNoBaseModelDto,
} from './dto/payable-no-base-model.dto';
import { PayableService } from './payable.service';

@ApiTags('Payable')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller({ path: 'integrations/payable', version: '1' })
export class PayableController extends CrudStrategyController<
  Payable,
  PayableNoBaseModel,
  PayableNoBaseModel
> {
  constructor(private readonly payableService: PayableService) {
    super(payableService);
  }

  @Post()
  @ApiBody({
    type: PayableNoBaseModelDto,
  })
  @HttpCode(201)
  async create(
    @Body() createDto: PayableNoBaseModel,
    @Req() req,
  ): Promise<Payable> {
    return await this.payableService.create(createDto, req.user as JwtPayload);
  }

  @Post('/batch')
  @ApiBody({ type: PayableNoBaseModelDto })
  @HttpCode(201)
  async createMany(
    @Body() createDto: PayableNoBaseModel[],
    @Req() req,
  ): Promise<Bull.Job<string | null>> {
    if (createDto.length > 10) {
      this.payableService.createMany(createDto, req.user as JwtPayload);

      return 'It will be send a email notification' as any;
    }

    return await this.payableService.createMany(
      createDto,
      req.user as JwtPayload,
    );
  }

  @Patch(':id')
  @ApiBody({ type: PayableNoBaseModelDto })
  async update(
    @Param('id') id: string,
    @Body() updateDto: PayableNoBaseModel,
  ): Promise<Payable> {
    return await this.payableService.update(id, updateDto);
  }
}
