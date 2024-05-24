import { Module } from '@nestjs/common';
import { BCryptService } from './bcrypt/bcrypt.service';
import { HashGenerator } from './shared/hash/hash-generator';

@Module({
  providers: [
    {
      provide: HashGenerator,
      useClass: BCryptService,
    },
  ],
  exports: [HashGenerator],
})
export class CryptoModule {}
