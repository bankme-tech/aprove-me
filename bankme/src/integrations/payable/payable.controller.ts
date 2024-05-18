import { Body, Controller, Post } from '@nestjs/common';
import { PayableService } from './payable.service';
import { IPayableCreation } from '../types';
import PayableDto from '../dto/PayableDto';
import Payable from '../entity/Payable';
import AssignorDto from '../dto/AssignorDto';
import Assignor from '../entity/Assignor';
import { AssignorService } from '../assignor/assignor.service';

@Controller('integrations/payable')
export class PayableController {
  constructor(
    private payableService: PayableService,
    private assignorService: AssignorService,
  ) {}

  @Post('/')
  async createPayableRegister(@Body() payableBody: IPayableCreation) {
    const payable: Payable = PayableDto.toEntity(payableBody);
    const assignor: Assignor = AssignorDto.toEntity(payableBody);

    const responseAssignor =
      await this.assignorService.createAssignorRegister(assignor);

    payable.assignorId = responseAssignor.id;

    const responsePayable =
      await this.payableService.createPayableRegister(payable);

    return responsePayable;
  }
}
