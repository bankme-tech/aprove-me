import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { AssignorController } from './interfaces/http/controllers/assignor.controller';
import { PayableController } from './interfaces/http/controllers/payable.controller';
import { AssignorService } from './domain/services/assignor.service';
import { PayableService } from './domain/services/payable.service';
import { AuthService } from './application/auth/auth.service';
import { PrismaPayableRepository } from './infrastructure/repositories/prisma-payable.repository';
import { PrismaAssignorRepository } from './infrastructure/repositories/prisma-assignor.repository';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1m',
      },
    }),
  ],
  controllers: [AppController, AssignorController, PayableController],
  providers: [
    AppService,
    PayableService,
    AssignorService,
    AuthService,
    {
      provide: 'PayableRepository',
      useClass: PrismaPayableRepository,
    },
    {
      provide: 'AssignorRepository',
      useClass: PrismaAssignorRepository,
    },
  ],
})
export class AppModule {}
