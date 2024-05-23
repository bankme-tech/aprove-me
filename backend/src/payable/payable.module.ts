import { Module, forwardRef } from '@nestjs/common';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { PayableRepository } from './repository/repository.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionModule } from 'src/auth/session/session-manager.module';
import { MailerService } from 'src/mailer/mailer.service';
import { RabbitMqModule } from 'src/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
    SessionModule, 
    forwardRef(() => RabbitMqModule) // I solve the circular dependency later
  ],
  controllers: [PayableController],
  providers: [
    PayableService, 
    PayableRepository, 
    PrismaService, 
    MailerService
  ],
  exports: [PayableService]
})
export class PayableModule {}
