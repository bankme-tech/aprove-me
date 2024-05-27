import {
  CreatePayableInputDTO,
  CreatePayableOutputDTO,
} from "../dtos/payable.dto";

export interface IPayableService {
  create(data: CreatePayableInputDTO): Promise<CreatePayableOutputDTO>;
  findById(id: string): Promise<CreatePayableOutputDTO | null>;
}
