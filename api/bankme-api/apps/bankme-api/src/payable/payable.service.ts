import { Inject, Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { IPayableDomainService } from 'bme/core/domains/payables/interfaces/payable-service.interface';
import { PayableDomainService } from 'bme/core/domains/payables/payable-service';
import { PayableVO } from 'bme/core/domains/payables/vos/payable.vo';
import { HttpResult } from 'bme/core/http/http-result';
import { HttpVO } from 'bme/core/http/http.vo';
import { AssignorVO } from 'bme/core/domains/assignors/vos/assignor.vo';
import { AssignorDomainService } from 'bme/core/domains/assignors/assignor-service';
import { IAssignorDomainService } from 'bme/core/domains/assignors/interfaces/assignor-service.interface';

@Injectable()
export class PayableService {
  constructor(
    @Inject(PayableDomainService)
    protected payableService: IPayableDomainService,
    @Inject(AssignorDomainService)
    protected assignorService: IAssignorDomainService,
  ) {}
  async create(createPayableDto: CreatePayableDto): Promise<HttpVO> {
    let assignorVO: AssignorVO;
    if (createPayableDto.assignor) {
      assignorVO = new AssignorVO(
        createPayableDto.assignor.document,
        createPayableDto.assignor.email,
        createPayableDto.assignor.phone,
        createPayableDto.assignor.name,
      );

      this.assignorService.resetDomain();

      const validation = await this.assignorService.validate(assignorVO);

      if (!validation)
        return HttpResult.BadRequest(
          createPayableDto,
          this.assignorService.getErrors(),
        );
    }
    const createVO = new PayableVO(
      '',
      createPayableDto.value,
      createPayableDto.emissionDate,
      createPayableDto.assignorId,
      assignorVO,
    );

    try {
      this.payableService.resetDomain();

      const createResult = await this.payableService.create(createVO);
      const errors = this.payableService.getErrors();

      if (errors.length)
        return HttpResult.BadRequest(
          createPayableDto,
          this.payableService.getErrors(),
        );

      return HttpResult.Ok(createResult);
    } catch (e) {
      return HttpResult.UnprocessableEntity(createPayableDto, [e.message]);
    }
  }

  async findAll() {
    try {
      const results = await this.payableService.getAll();
      const errors = this.payableService.getErrors();

      if (errors.length)
        return HttpResult.BadRequest({}, this.payableService.getErrors());

      return HttpResult.Ok({
        results,
      });
    } catch (e) {
      return HttpResult.BadRequest({}, [e.message]);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.payableService.getById(id);
      const errors = this.payableService.getErrors();

      if (errors.length)
        return HttpResult.BadRequest({ id }, this.payableService.getErrors());

      return HttpResult.Ok(result);
    } catch (e) {
      return HttpResult.BadRequest({ id }, [e.message]);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.payableService.removeById(id);
      const errors = this.payableService.getErrors();

      if (errors.length)
        return HttpResult.BadRequest({ id }, this.payableService.getErrors());

      return HttpResult.Ok(result);
    } catch (e) {
      return HttpResult.BadRequest({ id }, [e.message]);
    }
  }
}
