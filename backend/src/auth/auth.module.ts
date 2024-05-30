import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
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
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
    }),
    PassportModule,
    UserModule,
  ],
  providers: [
    AuthService,
    { provide: 'Encrypter', useClass: BcryptAdapter },
    ConfigService,
    LocalStrategy,
    PrismaService,
    UserService,
  ],
})
export class AuthModule {}
