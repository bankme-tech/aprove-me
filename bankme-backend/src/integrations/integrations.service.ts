import { Injectable } from '@nestjs/common';
import { PayableDto, UpdatePayableDto } from './dto/payable.dto';
import { CreateAssignorDto, UpdateAssignorDto } from './dto/assignor.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class IntegrationsService {
  constructor(private readonly db: DbService) {}

  async getPayableById(receivableId: string) {
    const payable = await this.db.receivable.findUnique({
      where: { id: receivableId },
    });
    return payable;
  }

  async createPayable(dto: PayableDto) {
    const { assignor, receivable } = dto;
    const payable = await this.db.receivable.create({
      data: {
        emissionDate: receivable.emissionDate,
        value: receivable.value,
        Assignor: {
          connect: {
            id: assignor.id,
          },
        },
      },
    });

    return payable;
  }

  async updatedPayable(receivableId: string, dto: UpdatePayableDto) {
    const { receivable } = dto;
    const updatedPayable = await this.db.receivable.update({
      where: { id: receivableId },
      data: {
        value: receivable.value,
        emissionDate: receivable.emissionDate,
      },
    });

    return updatedPayable;
  }

  async deletePayable(receivableId: string) {
    await this.db.receivable.delete({ where: { id: receivableId } });
  }

  // assignor

  async getAssignorById(assignorId: string) {
    const assignor = await this.db.assignor.findUnique({
      where: { id: assignorId },
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
