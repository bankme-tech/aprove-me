import { Module } from '@nestjs/common';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { PayableRepository } from './repository/repository.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionModule } from 'src/auth/session/session-manager.module';
import { PayableProcessor } from 'src/rabbit-mq/consumer.service';
import { RabbitMqService } from 'src/rabbit-mq/rabbit-mq.service';
import { RabbitMqModule } from 'src/rabbit-mq/rabbit-mq.module';
// import { SessionManagerService } from 'src/auth/session-manager.service';

// the Session Manager Service should stay in a shared module?
@Module({
  imports: [SessionModule, RabbitMqModule],
  controllers: [PayableController],
  providers: [PayableService, PayableRepository, PayableProcessor,  PrismaService, RabbitMqService],
})
export class PayableModule {}
