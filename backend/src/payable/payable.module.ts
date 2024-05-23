import { Module } from '@nestjs/common';
import { PayableController } from './payable.controller';
import { CreatePayableUseCase } from './usecases/create-payable.usecase';
import { PrismaPayableRepository } from './repositories/prisma-payable.repository';
import { IPayableRepository } from './repositories/payable.repository.interface';
import { PayableMapper } from './mappers/payable.mapper.interface';
import { PrismaPayableMapper } from './mappers/prisma-payable.mapper';
import { ICreatePayableUseCase } from './usecases/create-payable.usecase.interface';
import { AssignorModule } from 'src/assignor/assignor.module';

@Module({
  controllers: [PayableController],
  providers: [
    {
      provide: ICreatePayableUseCase,
      useClass: CreatePayableUseCase,
    },
    {
      provide: IPayableRepository,
      useClass: PrismaPayableRepository,
    },
    {
      provide: PayableMapper,
      useClass: PrismaPayableMapper,
    },
  ],
  imports: [AssignorModule],
})
export class PayableModule {}
