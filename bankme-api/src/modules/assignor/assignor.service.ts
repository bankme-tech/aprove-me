import { Injectable } from '@nestjs/common';
import prisma from '../../client';

@Injectable()
export class AssignorService {
  async findAll() {
    const assignors = await prisma.assignor.findMany();

    return assignors;
  }
}