import { Injectable } from '@nestjs/common';
import prisma from '../../client';

@Injectable()
export class PayableService {
  async findAll() {
    const payables = await prisma.payable.findMany();

    return payables;
  }
}