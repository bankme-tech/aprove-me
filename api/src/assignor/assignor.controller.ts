import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, UseGuards } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { RolesGuard } from 'src/auth/auth.guard';
import { Request } from "@nestjs/common";

@Controller('integrations')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @UseGuards(RolesGuard)
  @Get('/assignor/:id')
  async findOne(@Param('id') id: string) {
    try {
      if (!id) {
        throw new BadRequestException('ID do cedente é obrigatório.');
      }
      return await this.assignorService.findOne(id);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      } else {
      
        throw new BadRequestException('Erro inesperado ao buscar os dados do cedente.');

      }
    }
  }

  @UseGuards(RolesGuard)
  @Delete('/assignor/:id')
  async deleteAssignor(@Param('id') id: string) {
    try {
      if (!id) {
        throw new BadRequestException('ID do cedente é obrigatório.');
      }
      return await this.assignorService.deleteAssignor(id);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      } else {
        throw new BadRequestException('Erro inesperado ao deletar o cedente.');
      }
    }
  }

  @UseGuards(RolesGuard)
  @Patch('/assignor/:id')
  async updateAssignor(@Param('id') id: string, @Body() updateAssignorDto: UpdateAssignorDto) {
    try {
      if (!id) {
        throw new BadRequestException('ID do cedente é obrigatório.');
      }
      return await this.assignorService.updateAssignor(id, updateAssignorDto);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      } else {
        throw new BadRequestException('Erro inesperado ao atualizar o cedente.');
      }
    }
  }
}
