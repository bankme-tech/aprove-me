import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import prisma from '../../client';
import { EditPayableDto } from './dto/editPayable.dto';
import { PayableDto } from './dto/payable.dto';

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

  async createPayable(payable: PayableDto) {
    const newPayable = await prisma.payable.create({
      data: payable
    });

    return newPayable;
  }

  async edit(id: string, data: EditPayableDto) {
    try {
      const updatedPayable = await prisma.payable.update({
        where: { id },
        data
      });
  
      return updatedPayable;
    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    try {
      const deletedPayable = await prisma.payable.delete({
        where: { id }
      });
  
      return deletedPayable;
    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
