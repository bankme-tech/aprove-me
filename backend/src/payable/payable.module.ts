import { Module } from '@nestjs/common';
import { PayableController } from './payable.controller';
import { CreatePayableUseCase } from './usecases/create-payable.usecase';
import { PrismaPayableRepository } from './repositories/prisma-payable.repository';
import { IPayableRepository } from './repositories/payable.repository.interface';
import { IPayableMapper } from './mappers/payable.mapper.interface';
import { PrismaPayableMapper } from './mappers/prisma-payable.mapper';
import { ICreatePayableUseCase } from './usecases/create-payable.usecase.interface';
import { AssignorModule } from 'src/assignor/assignor.module';
import { IFindAllPayablesUseCase } from './usecases/find-all-payables.usecase.interface';
import { FindAllPayablesUseCase } from './usecases/find-all-payables.usecase';
import { IFindPayableUseCase } from './usecases/find-payable.usecase.interface';
import { FindPayableUseCase } from './usecases/find-payable.usecase';
import { IUpdatePayableUseCase } from './usecases/update-payable.usecase.interface';
import { UpdatePayableUseCase } from './usecases/update-payable.usecase';
import { IRemovePayableUseCase } from './usecases/remove-payable.usecase.interface';
import { RemovePayableUseCase } from './usecases/remove-payable-usecase';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
import { RabbitMQProducer } from 'src/rabbitmq/rabbitmq.producer';
import { IProducer } from 'src/rabbitmq/interfaces/producer.interface';
import { EmailModule } from 'src/email/email.module';
import { PayableService } from './payable.service';

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
      provide: IUpdatePayableUseCase,
      useClass: UpdatePayableUseCase,
    },
    {
      provide: IRemovePayableUseCase,
      useClass: RemovePayableUseCase,
    },
    {
      provide: IPayableMapper,
      useClass: PrismaPayableMapper,
    },
    {
      provide: IProducer,
      useClass: RabbitMQProducer,
    },
    PayableService,
  ],
  imports: [AssignorModule, RabbitMQModule, EmailModule],
  exports: [PayableService],
})
export class PayableModule {}
