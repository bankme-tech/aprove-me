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
import { AssignorDto } from '../../DTOs/assignor';
import { AssignorServices } from './assignor.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/AuthGuard';

@Controller('integrations')
export class AssignorController {
  constructor(private assignor: AssignorServices) {}

  @UseGuards(JwtAuthGuard)
  @ApiTags('Assignors')
  @Post('assignor')
  async createAssignor(@Body() body: AssignorDto) {
    try {
      const assignorExist = await this.assignor.getAssignorById(body.id);

      if (assignorExist) {
        throw new BadRequestException('Assignor already exists');
      }

      const newAssignor = await this.assignor.createAssignor(body);

      return newAssignor;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Assignors')
  @Get('assignor')
  @HttpCode(HttpStatus.OK)
  async getAssignorsAll() {
    try {
      const assignors = await this.assignor.getAllAssignors();

      if (assignors.length === 0 || !assignors) {
        return [];
      }

      return assignors;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Assignors')
  @Get('assignor/:id')
  @HttpCode(HttpStatus.OK)
  async getAssignorById(@Param('id') id: string) {
    try {
      const assignors = await this.assignor.getAssignorById(id);

      if (!assignors) {
        throw new NotFoundException(`Assignor with ID ${id} not found`);
      }

      return assignors;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Assignors')
  @Put('assignor/:id')
  @HttpCode(HttpStatus.OK)
  async updateAssignor(@Param('id') id: string, @Body() body: AssignorDto) {
    try {
      const assignorExist = await this.assignor.getAssignorById(id);

      if (!assignorExist) {
        throw new NotFoundException(`Assignor with ID ${id} not found`);
      }

      const assignorUpdated = await this.assignor.updateAssignor(id, body);

      return assignorUpdated;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Assignors')
  @Delete('assignor/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAssignor(@Param('id') id: string) {
    try {
      await this.assignor.deleteAssignor(id);

      return null;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
