import { Global, Module } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfig } from './config/env.config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: {
          expiresIn: configService.get<string | number>('jwtExpiresIn'),
        },
      }),
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService, JwtModule],
})
export class InfraModule {}
