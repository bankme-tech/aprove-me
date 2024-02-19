import { IReaderRepository } from 'bme/core/infra/database/reader-repository.interface';
import { IWriterRepository } from 'bme/core/infra/database/writer-repository.interface';
import { Payable } from '../entities/payable.entity';

export interface IPayableRepository
  extends IWriterRepository<Payable>,
    IReaderRepository<Payable> {}
