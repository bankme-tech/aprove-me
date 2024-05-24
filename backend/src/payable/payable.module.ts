import { Module } from '@nestjs/common';
import { PayableController } from './payable.controller';
import { CreatePayableUseCase } from './usecases/create-payable.usecase';
import { PrismaPayableRepository } from './repositories/prisma-payable.repository';
import { IPayableRepository } from './repositories/payable.repository.interface';
import { PayableMapper } from './mappers/payable.mapper.interface';
import { PrismaPayableMapper } from './mappers/prisma-payable.mapper';
import { ICreatePayableUseCase } from './usecases/create-payable.usecase.interface';
import { AssignorModule } from 'src/assignor/assignor.module';
import { IFindAllPayablesUseCase } from './usecases/find-all-payables.usecase.interface';
import { FindAllPayablesUseCase } from './usecases/find-all-payables.usecase';
import { IFindPayableUseCase } from './usecases/find-payable.usecase.interface';
import { FindPayableUseCase } from './usecases/find-payable.usecase';

@Module({
  controllers: [PayableController],
  providers: [
    {
      provide: ICreatePayableUseCase,
      useClass: CreatePayableUseCase,
    },
    {
      provide: IFindAllPayablesUseCase,
      useClass: FindAllPayablesUseCase,
    },
    {
      provide: IPayableRepository,
      useClass: PrismaPayableRepository,
    },
    {
      provide: IFindPayableUseCase,
      useClass: FindPayableUseCase,
    },
    {
      provide: PayableMapper,
      useClass: PrismaPayableMapper,
    },
  ],
  imports: [AssignorModule],
})
export class PayableModule {}
