import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { PayableRepo } from './repositories/payable-repo';
import { prismaPayableRepo } from './repositories/prisma/prisma-payable-repo';
import { AssignorRepo } from './repositories/assignor-repo';
import { prismaAssignorRepo } from './repositories/prisma/prisma-assignor-repo';
import { UserRepo } from './repositories/user-repo';
import { prismaUserRepo } from './repositories/prisma/prisma-user-repo';
import { AuthService } from './auth/auth-service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    { provide: PayableRepo, useClass: prismaPayableRepo },
    { provide: AssignorRepo, useClass: prismaAssignorRepo },
    { provide: UserRepo, useClass: prismaUserRepo },
    AuthService,
  ],
})
export class AppModule {}
