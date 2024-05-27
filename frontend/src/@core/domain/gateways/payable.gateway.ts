import { CreatePayableInputDTO } from "../dtos/payable.dto";
import { Payable } from "../entities/payable.entity";

export interface IPayableGateway {
  create(data: CreatePayableInputDTO): Promise<Payable>;
  findById(id: string): Promise<Payable> | null;
  findAll(): Promise<Payable[]>;
}
