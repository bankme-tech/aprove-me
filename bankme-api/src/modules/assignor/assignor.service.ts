import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import prisma from '../../client';
import { AssignorDto } from './dto/assignor.dto';

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

  async createAssignor(payable: AssignorDto) {

    const newPayable = await prisma.assignor.create({
      data: payable
    });

    return newPayable;
  }
}