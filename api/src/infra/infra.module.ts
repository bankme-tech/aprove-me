import { Global, Module } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class InfraModule {}
