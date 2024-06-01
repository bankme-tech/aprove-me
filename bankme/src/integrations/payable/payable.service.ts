import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import Payable from '../entity/Payable';
import PayableRepository from './payable.repository';
import { IPayable } from '../types/IPayables';
import PayableDto from '../dto/PayableDto';
import PayableCreationDto from '../dto/PayableCreationDto';
import { ClientProxy } from '@nestjs/microservices';
import { uuid } from 'uuidv4';
import { AssignorJwtPayload } from '../types';
import { AssignorService } from '../assignor/assignor.service';

@Injectable()
export class PayableService {
  constructor(
    private payableRepository: PayableRepository,
    private assignorService: AssignorService,
    @Inject('PAYABLE_SERVICE') private client: ClientProxy,
  ) {}

  async createPayableRegister(payable: Payable): Promise<IPayable> {
    const createdPayable =
      await this.payableRepository.createPayableRegister(payable);

    return PayableDto.fromEntity(createdPayable);
  }

  async findPayableById(id: string) {
    const payable = await this.payableRepository.findPayableById(id);

    if (!payable) {
      throw new HttpException('Payable not found.', HttpStatus.NOT_FOUND);
    }

    return PayableDto.fromEntity(payable);
  }

  async updatePayableById(id: string, payable: Payable) {
    const updatedPayable = await this.payableRepository.updatePayableById(
      id,
      payable,
    );

    if (!updatedPayable) {
      throw new HttpException('Payable not found.', HttpStatus.NOT_FOUND);
    }

    return PayableDto.fromEntity(updatedPayable);
  }

  async deletePayableById(id: string) {
    const payable = await this.payableRepository.deletePayableById(id);

    if (!payable) {
      throw new HttpException('Payable not found.', HttpStatus.NOT_FOUND);
    }

    return;
  }

  async processBatch(
    batchData: PayableCreationDto[],
    user: AssignorJwtPayload,
  ) {
    const assignor = await this.assignorService.findAssignorByEmail(user.sub);

    if (!assignor) {
      throw new HttpException('Assignor not found.', HttpStatus.NOT_FOUND);
    }

    const batchId = uuid();
    batchData.forEach((payableData: PayableCreationDto, _index, array) => {
      const message = {
        batchId,
        email: user.sub,
        total: array.length,
        ...payableData,
      };
      this.client.emit('payable_batch', message);
    });
  }
}
