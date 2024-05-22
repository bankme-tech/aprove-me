import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags, OmitType } from '@nestjs/swagger';
import { Assignor } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { CrudStrategyController } from '../crud-strategy/crud-strategy.controller';
import { AssignorService } from './assignor.service';
import { AssignorDto } from './dto/assignor.dto';

@UseGuards(AuthGuard)
@ApiTags('Assignor')
@Controller({ path: 'integrations/assignor', version: '1' })
export class AssignorController extends CrudStrategyController<
  Assignor,
  Omit<AssignorDto, 'id'>,
  Omit<AssignorDto, 'id'>
> {
  constructor(private readonly assignorService: AssignorService) {
    super(assignorService);
  }

  @Post()
  @ApiBody({ type: OmitType(AssignorDto, ['id']) })
  @HttpCode(201)
  async create(@Body() createDto: Omit<AssignorDto, 'id'>): Promise<Assignor> {
    return await this.assignorService.create(createDto);
  }

  @Patch(':id')
  @ApiBody({ type: OmitType(AssignorDto, ['id']) })
  async update(
    @Param('id') id: string,
    @Body() updateDto: Omit<AssignorDto, 'id'>,
  ): Promise<Assignor> {
    return await this.assignorService.update(id, updateDto);
  }
}
