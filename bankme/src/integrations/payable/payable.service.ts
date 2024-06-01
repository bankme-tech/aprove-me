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

  async updatePayableById(id: string, payable: Payable, email: string) {
    const payableFound = await this.payableRepository.findPayableById(id);

    if (!payableFound) {
      throw new HttpException('Payable not found.', HttpStatus.NOT_FOUND);
    }

    await this.verifyAuthority(email, payableFound.assignorId);

    const updatedPayable = await this.payableRepository.updatePayableById(
      id,
      payable,
    );

    return PayableDto.fromEntity(updatedPayable);
  }

  async deletePayableById(id: string, email: string) {
    const payable = await this.payableRepository.findPayableById(id);

    if (!payable) {
      throw new HttpException('Payable not found.', HttpStatus.NOT_FOUND);
    }

    await this.verifyAuthority(email, payable.assignorId);

    await this.payableRepository.deletePayableById(id);
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
        email: assignor.email,
        total: array.length,
        ...payableData,
      };

      if (assignor.id !== payableData.assignorId) {
        throw new HttpException(
          'Assignor not allowed to create payable for another assignor.',
          HttpStatus.FORBIDDEN,
        );
      }

      this.client.emit('payable_batch', message);
    });
  }

  private async verifyAuthority(email: string, assignorId: string) {
    const assignor = await this.assignorService.findAssignorByEmail(email);

    if (!assignor) {
      throw new HttpException('Assignor not found.', HttpStatus.NOT_FOUND);
    }

    if (assignor.id !== assignorId) {
      throw new HttpException(
        'Assignor not allowed to do this operation.',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
