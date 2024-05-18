import { Injectable } from '@nestjs/common';
import { CreatePayableDto, UpdatePayableDto } from './dto/payable.dto';
import { CreateAssignorDto, UpdateAssignorDto } from './dto/assignor.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class IntegrationsService {
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

  // assignor

  async getAssignorById(id: string) {
    const assignor = await this.db.assignor.findUnique({
      where: { id },
    });
    return assignor;
  }

  async createAssignor(dto: CreateAssignorDto) {
    const { document, email, name, phone } = dto;
    const assignor = await this.db.assignor.create({
      data: {
        document,
        email,
        name,
        phone,
      },
    });

    return assignor;
  }

  async updateAssignor(id: string, dto: UpdateAssignorDto) {
    const { document, email, name, phone } = dto;
    const updatedAssignor = await this.db.assignor.update({
      where: { id },
      data: { document, email, name, phone },
    });

    return updatedAssignor;
  }

  async deleteAssignor(id: string) {
    await this.db.assignor.delete({
      where: {
        id,
      },
    });
  }
}
