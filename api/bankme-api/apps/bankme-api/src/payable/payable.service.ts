import { Inject, Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { IPayableDomainService } from 'bme/core/domains/payables/interfaces/payable-service.interface';
import { PayableDomainService } from 'bme/core/domains/payables/payable-service';
import { PayableVO } from 'bme/core/domains/payables/vos/payable.vo';
import { HttpResult } from 'bme/core/http/http-result';
import { HttpVO } from 'bme/core/http/http.vo';
import { AssignorVO } from 'bme/core/domains/assignors/vos/assignor.vo';

@Injectable()
export class PayableService {
  constructor(
    @Inject(PayableDomainService)
    protected service: IPayableDomainService,
  ) {}
  async create(createPayableDto: CreatePayableDto): Promise<HttpVO> {
    let assignor: AssignorVO;
    if (createPayableDto.assignor) {
      assignor = new AssignorVO(
        createPayableDto.assignor.document,
        createPayableDto.assignor.email,
        createPayableDto.assignor.phone,
        createPayableDto.assignor.name,
      );
    }
    const createVO = new PayableVO(
      '',
      createPayableDto.value,
      createPayableDto.emissionDate,
      createPayableDto.assignorId,
      assignor,
    );

    const validation = this.service.validate(createVO);

    if (validation.length)
      return HttpResult.BadRequest(createPayableDto, validation);

    try {
      const createResult = await this.service.create(createVO);

      return HttpResult.Ok(createResult);
    } catch (e) {
      return HttpResult.UnprocessableEntity(createPayableDto, [e.message]);
    }
  }

  async findAll() {
    return await this.service.getAll();
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
