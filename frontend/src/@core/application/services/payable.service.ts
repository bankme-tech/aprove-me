import { inject, injectable } from "inversify";
import {
  CreatePayableInputDTO,
  CreatePayableOutputDTO,
} from "../../domain/dtos/payable.dto";
import { TYPES } from "../../infra/dependecy-injection/types";
import { IPayableService } from "../../domain/services/payable.service.interface";
import { Payable } from "../../domain/entities/payable.entity";
import type { IPayableGateway } from "@/@core/domain/gateways/payable.gateway";

@injectable()
export class PayableService implements IPayableService {
  constructor(
    @inject(TYPES.IPayableGateway)
    private readonly payableGateway: IPayableGateway
  ) {}

  async create(data: CreatePayableInputDTO): Promise<CreatePayableOutputDTO> {
    return this.payableGateway.create(data);
  }

  async findById(id: string): Promise<Payable | null> {
    const result = await this.payableGateway.findById(id);
    if (!result) {
      return null;
    }
    return result;
  }

  findAll(): Promise<Payable[]> {
    return this.payableGateway.findAll();
  }
}
