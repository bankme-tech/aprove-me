import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import Assignor from '../entity/Assignor';
import AssignorCreationDto from '../dto/AssignorCreationDto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/integrations/assignor/')
@ApiBearerAuth()
@ApiTags('Assignor')
export class AssignorController {
  constructor(private assignorService: AssignorService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorizeds',
  })
  @ApiBody({
    type: AssignorCreationDto,
    description: 'Json structure for user object',
  })
  async createAssignorRegister(@Body() assignorBody: AssignorCreationDto) {
    const assignor: Assignor = assignorBody.toEntity();

    const responseAssignor =
      await this.assignorService.createAssignorRegister(assignor);

    return responseAssignor;
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The record was found.',
  })
  @ApiResponse({
    status: 404,
    description: 'The record was not found.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorizeds',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Assignor id',
  })
  async findAssignorById(@Param('id') id: string) {
    const assignor = await this.assignorService.findAssignorById(id);

    return assignor;
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The record was updated sucessfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'The record was not found.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorizeds',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Assignor id',
  })
  @ApiBody({
    type: AssignorCreationDto,
    description: 'Json structure for user object',
  })
  async updateAssignorById(
    @Param('id') id: string,
    @Body() assignorBody: AssignorCreationDto,
  ) {
    const assignor = assignorBody.toEntity();

    const responseAssignor = await this.assignorService.updateAssignorById(
      id,
      assignor,
    );

    return responseAssignor;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'The record was deleted sucessfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'The record was not found.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorizeds',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Assignor id',
  })
  async deleteAssignorById(@Param('id') id: string) {
    await this.assignorService.deleteAssignorById(id);

    return;
  }
}
