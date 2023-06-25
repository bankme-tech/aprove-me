import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';

import { AssignorRepository } from '../../data/repositories/assignor-repository/assignor-repository';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { BcryptAdapter } from '../../infra/bcrypt/bcrypt-adapter';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { MailerService } from '../../infra/mailer/mailer';

@Module({
  imports: [PrismaModule],
  controllers: [AssignorController],
  providers: [
    AssignorService, 
    AssignorRepository, 
    BcryptAdapter,
    JwtStrategy,
    MailerService
  ],
  exports: [AssignorService]
})
export class AssignorModule {}
