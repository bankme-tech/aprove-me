import { Payable } from '../entities/payable.entity';
import { CreatePayableDto } from '../dto/create-payable.dto';
import { UpdatePayableDto } from '@payable/dto/update-payable.dto';

export abstract class PayableRepository {
  abstract getAll(): Promise<Payable[]>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Payable>;
  abstract create(createPayableDto: CreatePayableDto): Promise<Payable>;
  abstract update(id: string, updatePayableDto: UpdatePayableDto): Promise<Payable>;
}
