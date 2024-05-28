import {
  CreatePayableInputDTO,
  CreatePayableOutputDTO,
  UpdatePayableInputDTO,
} from "../dtos/payable.dto";

export interface IPayableService {
  create(data: CreatePayableInputDTO): Promise<CreatePayableOutputDTO>;
  findById(id: string): Promise<CreatePayableOutputDTO | null>;
  findAll(): Promise<CreatePayableOutputDTO[]>;
  update(id: string, data: UpdatePayableInputDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
