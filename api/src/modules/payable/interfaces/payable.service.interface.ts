import { CreatePayableDTO } from '../dto/create-payable.dto';
import { UpdatePayableDTO } from '../dto/update-payable.dto';
import { IPayable } from './payable.interface';

export interface IPayableService {
  findAll(): Promise<IPayable[]>;
  findById(id: string): Promise<IPayable>;
  create(payable: CreatePayableDTO): Promise<CreatePayableDTO>;
  update(id: string, payable: UpdatePayableDTO): Promise<IPayable>;
  delete(id: string): Promise<void>;
}
