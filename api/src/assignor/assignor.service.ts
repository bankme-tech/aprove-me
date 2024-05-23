import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { prisma } from '../prisma/prisma.client';
import { find } from 'rxjs';

@Injectable()
export class AssignorService {

  async create(createAssignorDto: CreateAssignorDto) {
    try{
      return await prisma.assignor.create({
        data: createAssignorDto,
      });
    } catch (error) {
      if( error instanceof BadRequestException){
        throw BadRequestException;
      }

    }

}

async findOne(id: string) {
  const assignor = await prisma.assignor.findUnique({
    where: { id },
  });
  if (!assignor) {
    throw new NotFoundException('Cedente não encontrado.');
  }
  return assignor;
}
async deleteAssignor(id: string) {
  const assignor = await prisma.assignor.delete({
    where: { id },
  });
  if (!assignor) {
    throw new NotFoundException('Cedente não encontrado.');
  }
  return {message: 'Cedente deletado com sucesso.'};
}

async updateAssignor(id: string, updateAssignorDto: UpdateAssignorDto) {
  try {
    const assignor = await prisma.assignor.update({
      where: { id },
      data: updateAssignorDto,
    });
    return assignor;
  } catch (error) {
    if (error instanceof BadRequestException || error instanceof NotFoundException) {
      throw error;
    }
    throw new BadRequestException('Ocorreu um erro ao atualizar o cedente.');
  }
}
}