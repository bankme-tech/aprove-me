import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { constants } from '@configs/constants';
import { UserModule } from '@user/user.module';
import { AuthController } from './auth.controller';
import { UserRepository } from '@user/repositories/user-repository';
import PrismaUserRepository from '@user/repositories/prisma-user-repository';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: constants.JwtSecret,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: UserRepository, useClass: PrismaUserRepository }],
  exports: [AuthService],
})
export class AuthModule {}
