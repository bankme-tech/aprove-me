import { Injectable } from '@nestjs/common';
import { CreatePayableDto, UpdatePayableDto } from './dto/payable.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class PayableRepository {
  constructor(private readonly db: DbService) {}

  async findById(id: string) {
    return this.db.payable.findUnique({ where: { id } });
  }

  async findAll() {
    return this.db.payable.findMany();
  }

  async create(dto: CreatePayableDto) {
    const { assignorId, emissionDate, value } = dto;
    return this.db.payable.create({
      data: {
        emissionDate,
        value,
        Assignor: {
          connect: { id: assignorId },
        },
      },
    });
  }

  async update(id: string, dto: UpdatePayableDto) {
    const { assignorId, emissionDate, value } = dto;
    return this.db.payable.update({
      where: { id },
      data: {
        assignorId,
        emissionDate,
        value,
      },
    });
  }

  async delete(id: string) {
    await this.db.payable.delete({ where: { id } });
  }
}
