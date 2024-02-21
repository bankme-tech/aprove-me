import { Payable } from '../entities/payable.entity';
import { CreatePayableDto } from '../dto/create-payable.dto';

export default abstract class PayableRepository {
  abstract create(createPayableDto: CreatePayableDto): Promise<Payable>;
  abstract findOne(id: string): Promise<Payable>;
  abstract findAll(): Promise<Payable[]>;
}
