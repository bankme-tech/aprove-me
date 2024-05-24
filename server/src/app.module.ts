import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { CryptoModule } from './infra/crypto/crypto.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    CryptoModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
