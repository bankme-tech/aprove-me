import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  ConflictException,
  HttpException,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { AssignorService } from '../services/assignor.service';
import { UUID } from 'crypto';
import { IsNotEmpty, IsUUID, IsString, MaxLength } from 'class-validator';
import { Assignor as AssignorModel } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

export class Assignor {
  id: UUID

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  document: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(140)
  email: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(140)
  name: string
}

@UseGuards(AuthGuard)
@Controller('/integrations/assignor/')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() assignorData: Assignor): Promise<AssignorModel> {
    const { document, email, phone, name } = assignorData;

    const existingAssignor = await this.assignorService.findByDocument(document);
    if (existingAssignor) {
      throw new ConflictException('A assignor with the same document already exists');
    }

    return this.assignorService.createAssignor({
      document,
      email,
      phone,
      name
    });
  }

  @Get(':id')
  async getAssignor(@Param('id') id: UUID): Promise<AssignorModel> {
    const assignor = await this.assignorService.assignor({ id });
    if (!assignor) {
      throw new HttpException('Assignor not found', HttpStatus.NOT_FOUND);
    }
    return assignor;
  }

  @Get()
  async getAllAssignors(): Promise<AssignorModel[]> {
    return this.assignorService.assignors({});
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: UUID,
    @Body() assignorData: Assignor
  ): Promise<AssignorModel> {
    // Verifica se o assignor existe
    const assignor = await this.assignorService.assignor({ id });
    if (!assignor) {
      throw new HttpException('Assignor not found', HttpStatus.NOT_FOUND);
    }

    const { document, email, phone, name } = assignorData;

    return this.assignorService.updateAssignor({
      where: { id },
      data: {
        document,
        email,
        phone,
        name
      }
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: UUID): Promise<AssignorModel> {
    const assignor = await this.assignorService.assignor({ id });
    if (!assignor) {
      throw new HttpException('Assigor not found', HttpStatus.NOT_FOUND);
    }
    return await this.assignorService.deleteAssignor({ id });
  }
}