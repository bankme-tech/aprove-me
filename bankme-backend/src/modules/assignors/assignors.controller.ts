import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards, Req, Request } from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateAssignorBodyDTO, CreateAssignorDataDTO } from './dtos/CreateAssignorDTO';
import { AssignorEntity } from './entities/assignors.entity';

// import { AuthGuard } from '../auth/auth.guard';

import { AssignorOkResponse,AssignorUnauthorizedResponse } from './swagger/assignors.swagger';

import { FindOneAssignorParamDTO } from './dtos/FindOneAssignorDTO';
import { UpdateAssignorBodyDTO, UpdateAssignorParamDTO } from './dtos/UpdateAssignorDTO';
import { FindAllAssignorQueryDTO } from './dtos/FindAllAssignorDTO';
import { DeleteAssignorParamDTO } from './dtos/DeleteAssignorDTO';

@Controller('assignors')
@ApiTags('Assignors')
@ApiBearerAuth()
// @UseGuards(AuthGuard)
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AssignorOkResponse })
  @ApiUnauthorizedResponse({ type: AssignorUnauthorizedResponse })
  create(
    @Body() body: CreateAssignorBodyDTO,
  ): Promise<AssignorEntity> {
    const { name, email, document, phone, userId } = body;
    return this.assignorsService.create({
      phone,
      document,
      email,
      name,
      userId,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [AssignorOkResponse] })
  @ApiUnauthorizedResponse({ type: AssignorUnauthorizedResponse })
  findAll(
    @Query() query: FindAllAssignorQueryDTO,
  ): Promise<{ assignors: AssignorEntity[] }> {
    const { email, name, phone, document, limit = 10, offset = 0 } = query;

    return this.assignorsService.findAll({
      email,
      name,
      phone,
      document,
      limit: Number(limit),
      offset: Number(offset),
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AssignorOkResponse })
  @ApiUnauthorizedResponse({ type: AssignorUnauthorizedResponse })
  findById(@Param() param: FindOneAssignorParamDTO): Promise<AssignorEntity | null> {
    const { id } = param;
    return this.assignorsService.findOne({ id: Number(id) });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AssignorOkResponse })
  @ApiUnauthorizedResponse({ type: AssignorUnauthorizedResponse })
  update(
    @Param() param: UpdateAssignorParamDTO,
    @Body() body: UpdateAssignorBodyDTO,
  ): Promise<AssignorEntity> {
    const { id } = param;
    const { name, email, phone, document } = body;
    return this.assignorsService.update({
      id: Number(id),
      name,
      email,
      phone,
      document,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: AssignorUnauthorizedResponse })
  delete(@Param() param: DeleteAssignorParamDTO): Promise<void> {
    const { id } = param;
    return this.assignorsService.delete({ id: Number(id) });
  }
}
