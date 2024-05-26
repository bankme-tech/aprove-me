import { Global, Module } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfig } from './config/env.config';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwtSecret'),
        signOptions: {
          expiresIn: configService.get('jwtExpiresIn'),
        },
      }),
      global: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: envConfig().mailHost,
        port: envConfig().mailPort,
        auth: {
          user: envConfig().mailUser,
          pass: envConfig().mailPassword,
        },
      },
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService, JwtModule],
})
export class InfraModule {}
