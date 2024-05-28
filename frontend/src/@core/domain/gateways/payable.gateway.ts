import { CreatePayableInputDTO } from "../dtos/payable.dto";
import { Payable } from "../entities/payable.entity";

export interface IPayableGateway {
  create(params: CreatePayableInputDTO): Promise<Payable>;
  findById(id: string): Promise<Payable | null>;
  findAll(): Promise<Payable[]>;
  update(id: string, params: CreatePayableInputDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
