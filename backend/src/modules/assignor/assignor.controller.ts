import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Assignor } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { CrudStrategyController } from '../crud-strategy/crud-strategy.controller';
import { AssignorService } from './assignor.service';
import {
  AssignorNoBaseModel,
  AssignorNoBaseModelDto,
} from './dto/assignor-no-base-model.dto';

@UseGuards(AuthGuard)
@ApiTags('Assignor')
@ApiBearerAuth()
@Controller({ path: 'integrations/assignor', version: '1' })
export class AssignorController extends CrudStrategyController<
  Assignor,
  AssignorNoBaseModel,
  AssignorNoBaseModel
> {
  constructor(private readonly assignorService: AssignorService) {
    super(assignorService);
  }

  @Post()
  @ApiBody({ type: AssignorNoBaseModelDto })
  @HttpCode(201)
  async create(@Body() createDto: AssignorNoBaseModel): Promise<Assignor> {
    return await this.assignorService.create(createDto);
  }

  @ApiBody({ type: AssignorNoBaseModelDto })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: AssignorNoBaseModel,
  ): Promise<Assignor> {
    return await this.assignorService.update(id, updateDto);
  }
}
