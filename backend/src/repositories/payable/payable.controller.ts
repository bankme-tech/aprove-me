import {
  Controller,
  Body,
  Post,
  HttpStatus,
  Get,
  HttpCode,
  Param,
  Put,
  Delete,
  NotFoundException,
  HttpException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PayableDto } from '../../DTOs/payable';
import { JwtAuthGuard } from '../../auth/AuthGuard';
import { PayableService } from './payable.service';

@Controller('integrations')
export class PayableController {
  constructor(private payable: PayableService) {}

  @UseGuards(JwtAuthGuard)
  @ApiTags('Payables')
  @Post('payable')
  async createPayable(@Body() body: PayableDto) {
    try {
      const payableExist = await this.payable.getPayableById(body.id);

      if (payableExist) {
        throw new BadRequestException('Payable already exists');
      }

      const newReceived = await this.payable.createPayable(body);

      return newReceived;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(JwtAuthGuard)
  @ApiTags('Payables')
  @Get('payable/:id')
  @HttpCode(HttpStatus.OK)
  async getPayableById(@Param('id') id: string) {
    try {
      const payable = await this.payable.getPayableById(id);

      if (!payable) {
        throw new NotFoundException(`Payable with ID ${id} not found`);
      }

      return payable;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(JwtAuthGuard)
  @ApiTags('Payables')
  @Get('payable')
  @HttpCode(HttpStatus.OK)
  async getPayableAll() {
    try {
      const payables = await this.payable.getAllPayables();
      console.log(payables);

      if (!payables) {
        throw new NotFoundException('Payables not found');
      }

      return payables;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(JwtAuthGuard)
  @ApiTags('Payables')
  @Put('payable/:id')
  @HttpCode(HttpStatus.OK)
  async updatePayable(@Param('id') id: string, @Body() body: PayableDto) {
    try {
      const payableExist = await this.payable.getPayableById(id);

      if (!payableExist) {
        throw new NotFoundException(`Payable with ID ${id} not found`);
      }

      const payableUpdated = await this.payable.updatePayable(id, body);

      return payableUpdated;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(JwtAuthGuard)
  @ApiTags('Payables')
  @Delete('payable/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePayable(@Param('id') id: string) {
    try {
      const payableExist = await this.payable.getPayableById(id);

      if (!payableExist) {
        throw new NotFoundException(`Payable with ID ${id} not found`);
      }

      await this.payable.deletePayable(id);

      return null;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
