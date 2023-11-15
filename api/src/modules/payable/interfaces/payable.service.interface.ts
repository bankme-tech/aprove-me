import { CreatePayableDTO } from '../dto/create-payable.dto';

export interface IPayableService {
  create(payable: CreatePayableDTO): Promise<CreatePayableDTO>;
}
