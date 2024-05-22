import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Controller('integrations')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

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
        console.log(error);
        throw new BadRequestException('Erro inesperado ao buscar os dados do cedente.');

      }
    }
  }

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
