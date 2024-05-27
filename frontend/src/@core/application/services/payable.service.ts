import { inject, injectable } from "inversify";
import {
  CreatePayableInputDTO,
  CreatePayableOutputDTO,
} from "../../domain/dtos/payable.dto";
import type { IPayableGateway } from "../../domain/gateways/payable.gateway";
import { TYPES } from "../../infra/dependecy-injection/types";
import { IPayableService } from "../../domain/services/payable.service.interface";
import { Payable } from "../../domain/entities/payable.entity";

@injectable()
export class PayableService implements IPayableService {
  constructor(
    @inject(TYPES.IPayableGateway)
    private readonly payableGateway: IPayableGateway
  ) {}

  async create(data: CreatePayableInputDTO): Promise<CreatePayableOutputDTO> {
    return this.payableGateway.create(data);
  }

  findById(id: string): Promise<Payable> | null {
    const result = this.payableGateway.findById(id);
    if (!result) {
      return null;
    }
    return result;
  }
}
