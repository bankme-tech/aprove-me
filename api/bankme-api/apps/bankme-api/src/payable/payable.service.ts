import { Inject, Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { IPayableDomainService } from 'bme/core/domains/payables/interfaces/payable-service.interface';
import { PayableDomainService } from 'bme/core/domains/payables/payable-service';
import { PayableVO } from 'bme/core/domains/payables/vos/payable.vo';

@Injectable()
export class PayableService {
  constructor(
    @Inject(PayableDomainService)
    protected service: IPayableDomainService,
  ) {}
  async create(createPayableDto: CreatePayableDto) {
    const createVO = new PayableVO(
      '',
      createPayableDto.value,
      createPayableDto.emissionDate,
      createPayableDto.assignorId,
    );

    const createResult = await this.service.create(createVO);
    return createResult;
  }

  async findAll() {
    // await this.service.getAll();
    return `This action returns all payable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payable`;
  }

  update(id: number, updatePayableDto: UpdatePayableDto) {
    return `This action updates a #${id} payable`;
  }

  remove(id: number) {
    return `This action removes a #${id} payable`;
  }
}
