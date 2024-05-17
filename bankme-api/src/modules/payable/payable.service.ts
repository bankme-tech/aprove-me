import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import prisma from '../../client';

@Injectable()
export class PayableService {
  async findAll() {
    const payables = await prisma.payable.findMany();

    return payables;
  }

  async findById(id: string) {
    const payable = await prisma.payable.findUnique({
      where: { id }
    });

    if (!payable) throw new HttpException('Payable not found!', HttpStatus.NOT_FOUND)

    return payable;
  }
}