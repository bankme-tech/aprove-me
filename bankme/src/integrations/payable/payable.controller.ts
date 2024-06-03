import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import Payable from '../entity/Payable';
import PayableCreationDto from '../dto/PayableCreationDto';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from '../types';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('integrations/payable')
@ApiBearerAuth()
@ApiTags('Payable')
export class PayableController {
  constructor(private payableService: PayableService) {}

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
    type: PayableCreationDto,
    description: 'Json structure for user object',
  })
  async createPayableRegister(@Body() payableBody: PayableCreationDto) {
    const payable: Payable = payableBody.toEntity();
    const responsePayable =
      await this.payableService.createPayableRegister(payable);

    return responsePayable;
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
    description: 'Payable id',
  })
  async findPayableById(@Param('id') id: string) {
    const responsePayable = await this.payableService.findPayableById(id);

    return responsePayable;
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
    description: 'Payable id',
  })
  @ApiBody({
    type: PayableCreationDto,
    description: 'Json structure for user object',
  })
  async updatePayableById(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() payableBody: PayableCreationDto,
  ) {
    const { user } = req;
    const payable: Payable = payableBody.toEntity();

    const responsePayable = await this.payableService.updatePayableById(
      id,
      payable,
      user.sub,
    );

    return responsePayable;
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
    description: 'Unauthorized, invalid jwt Token.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Assignor id',
  })
  async deletePayableById(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
  ) {
    const { user } = req;

    await this.payableService.deletePayableById(id, user.sub);

    return;
  }

  @Post('/batch')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Batch data processing.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid jwt Token.',
  })
  async processBatch(
    @Request() req: RequestWithUser,
    @Body() batchData: PayableCreationDto[],
  ) {
    const { user } = req;
    await this.payableService.processBatch(batchData, user);

    return 'Lote em processamento.';
  }
}
