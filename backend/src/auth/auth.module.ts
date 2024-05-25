import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'changeit',
    }),
    forwardRef(() => UsersModule),
    forwardRef(() => PrismaModule),
  ],
  controllers: [AuthController],
  providers: [UsersService, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
