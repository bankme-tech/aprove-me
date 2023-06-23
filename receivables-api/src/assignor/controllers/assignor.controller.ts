import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { AssignorDto } from '../dto/assignor.dto';
import { AssignorEntity } from '../assignor.entity';
import { AssignorService } from '../service/assignor.service';

@Controller('integrations/assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post()
  async createAssignor(
    @Body(ValidationPipe) assignorDto: AssignorDto,
  ): Promise<AssignorEntity> {
    try {
      const assignor: AssignorEntity = { ...assignorDto };
      return await this.assignorService.createAssignor(assignor);
    } catch (error) {
      throw new BadRequestException(
        'Não foi possível criar o cedente. Verifique os dados e tente novamente.',
      );
    }
  }

  @Get(':id')
  async getAssignorById(
    @Param('id') id: string,
  ): Promise<AssignorEntity | null> {
    try {
      const assignor = await this.assignorService.getAssignorById(Number(id));
      if (!assignor) {
        throw new NotFoundException('Cedente não encontrado.');
      }
      return assignor;
    } catch (error) {
      throw new NotFoundException(
        'Não foi possível obter o cedente. Verifique o ID e tente novamente.',
      );
    }
  }

  @Patch(':id')
  async updateAssignor(
    @Param('id') id: string,
    @Body() assignorDto: AssignorDto,
  ): Promise<AssignorEntity> {
    try {
      const assignor: AssignorEntity = { ...assignorDto };
      const updatedAssignor = await this.assignorService.updateAssignor(
        Number(id),
        assignor,
      );
      if (!updatedAssignor) {
        throw new NotFoundException('Cedente não encontrado.');
      }
      return updatedAssignor;
    } catch (error) {
      throw new BadRequestException(
        'Não foi possível atualizar o cedente. Verifique os dados e tente novamente.',
      );
    }
  }

  @Delete(':id')
  async deleteAssignor(@Param('id') id: string): Promise<void> {
    try {
      const deletedAssignor = await this.assignorService.deleteAssignor(
        Number(id),
      );
      if (!deletedAssignor) {
        throw new NotFoundException('Cedente não encontrado.');
      }
    } catch (error) {
      throw new NotFoundException(
        'Não foi possível excluir o cedente. Verifique o ID e tente novamente.',
      );
    }
  }
}
