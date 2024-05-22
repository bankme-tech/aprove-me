import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'changeit',
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [UsersService, AuthService],
})
export class AuthModule {}
