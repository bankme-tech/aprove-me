import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import PayableRepository from './payable.repository';
import { EmailModule } from '../../email/email.module';
import { EmailService } from '../../email/email.service';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [PayableController],
  providers: [PayableService, PayableRepository, EmailService],
})
export class PayableModule {}
