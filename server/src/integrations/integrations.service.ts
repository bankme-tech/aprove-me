import { Injectable } from '@nestjs/common';
import { PayableDto } from '../dtos/payable.dto';
import dbConnection from '../config/database/client';
import { ReceivableDto, UpdateReceivableDto } from '../dtos/receivable.dto';
import { AssignorDto, UpdateAssignorDto } from '../dtos/assignor.dto';

@Injectable()
export class IntegrationsService {
  async createPayable(payable: PayableDto): Promise<PayableDto> {
    await Promise.all([
      dbConnection.assignor.create({
        data: payable.assignor,
      }),
      dbConnection.receivable.create({
        data: {
          ...payable.receivable,
          emissionDate: new Date(payable.receivable.emissionDate),
        },
      }),
    ]);

    return payable;
  }

  async getPayable(id: string): Promise<ReceivableDto> {
    return await dbConnection.receivable.findUnique({
      where: { id },
      include: { assignor: true },
    });
  }

  async getAssignor(id: string): Promise<AssignorDto> {
    return await dbConnection.assignor.findUnique({
      where: { id },
    });
  }

  async updateReceivable(
    id: string,
    receivableData: UpdateReceivableDto,
  ): Promise<ReceivableDto> {
    return await dbConnection.receivable.update({
      where: { id },
      data: {
        ...receivableData,
      },
    });
  }

  async updateAssignor(
    id: string,
    assignorData: UpdateAssignorDto,
  ): Promise<UpdateAssignorDto> {
    return await dbConnection.assignor.update({
      where: { id },
      data: {
        ...assignorData,
      },
    });
  }

  async deleteReceivable(id: string): Promise<ReceivableDto> {
    return await dbConnection.receivable.delete({ where: { id } });
  }

  async deleteAssignor(id: string): Promise<AssignorDto> {
    return await dbConnection.assignor.delete({ where: { id } });
  }
}
