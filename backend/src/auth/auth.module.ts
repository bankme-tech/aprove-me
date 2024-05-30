import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/infra/database/prisma.service';
import { BcryptAdapter } from 'src/shared/adapters';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  imports: [PassportModule, UserModule],
  providers: [
    AuthService,
    { provide: 'Encrypter', useClass: BcryptAdapter },
    LocalStrategy,
    PrismaService,
    UserService,
  ],
})
export class AuthModule {}
