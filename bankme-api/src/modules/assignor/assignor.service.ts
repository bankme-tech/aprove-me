import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import prisma from '../../client';
import { AssignorDto } from './dto/assignor.dto';
import { EditAssignorDto } from './dto/editAssignor.dto';

@Injectable()
export class AssignorService {
  async findAll() {
    const assignors = await prisma.assignor.findMany();

    return assignors;
  }

  async findById(id: number) {
    const assignor = await prisma.assignor.findUnique({
      where: { id }
    });

    if (!assignor) throw new HttpException('Assignor not found!', HttpStatus.NOT_FOUND)

    return assignor;
  }

  async createAssignor(assignor: AssignorDto) {
    const newAssignor = await prisma.assignor.create({
      data: assignor
    });

    return newAssignor;
  }

  async edit(id: number, data: EditAssignorDto) {
    try {
      await this.findById(id);
      const updatedAssignor = await prisma.assignor.update({
        where: { id },
        data
      });
  
      return updatedAssignor;
    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async delete(id: number) {
    try {
      await this.findById(id);
      const deletedAssignor = await prisma.assignor.delete({
        where: { id }
      });
  
      return deletedAssignor;
    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
