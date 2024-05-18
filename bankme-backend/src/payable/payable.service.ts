import { Injectable } from '@nestjs/common';
import { CreatePayableDto, UpdatePayableDto } from './dto/payable.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class PayableService {
  constructor(private readonly db: DbService) {}

  async getPayableById(id: string) {
    const payable = await this.db.payable.findUnique({
      where: { id },
    });
    return payable;
  }

  async createPayable(dto: CreatePayableDto) {
    const { assignorId, emissionDate, value } = dto;
    const payable = await this.db.payable.create({
      data: {
        emissionDate: emissionDate,
        value: value,
        Assignor: {
          connect: {
            id: assignorId,
          },
        },
      },
    });

    return payable;
  }

  async updatedPayable(id: string, dto: UpdatePayableDto) {
    const { assignorId, emissionDate, value } = dto;
    const updatedPayable = await this.db.payable.update({
      where: { id },
      data: {
        value: value,
        emissionDate: emissionDate,
        assignorId,
      },
    });

    return updatedPayable;
  }

  async deletePayable(id: string) {
    await this.db.payable.delete({ where: { id: id } });
  }
}
