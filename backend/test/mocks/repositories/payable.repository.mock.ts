import { IPayableRepository } from 'src/payable/repositories/payable.repository.interface';
import { CreatePayableInputDTO } from 'src/payable/dto/create-payable.input.dto';
import { PayableEntity } from 'src/payable/entities/payable.entity';
import { makePayableEntity } from '../entities/payable.entity.mock';
import { UpdatePayableInputDTO } from 'src/payable/dto/update-payable.input.dto';
import { RemovePayableInputDTO } from 'src/payable/dto/remove-payable.input.dto';
import { FindPayableInputDTO } from 'src/payable/dto/find-payable.input.dto';

export class PayableRepositoryStub implements IPayableRepository {
  public data: CreatePayableInputDTO | string | UpdatePayableInputDTO;
  public response: PayableEntity = makePayableEntity();

  async save(createPayableDTO: CreatePayableInputDTO): Promise<PayableEntity> {
    this.data = createPayableDTO;
    return this.response;
  }

  async findAll(): Promise<PayableEntity[]> {
    return Promise.resolve([this.response]);
  }

  async findById(findPayableDTO: FindPayableInputDTO): Promise<PayableEntity> {
    this.data = findPayableDTO;
    return Promise.resolve(this.response);
  }

  async update(payable: UpdatePayableInputDTO): Promise<PayableEntity> {
    this.data = payable;
    return this.response;
  }

  async remove(id: RemovePayableInputDTO): Promise<void> {
    this.data = id;
    return null;
  }
}
