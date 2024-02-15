import { Module } from '@nestjs/common';
import { BcryptAdapterRepository, JwtAdapterRepo } from 'src/repositories';
import { BcryptAdapter } from './bcrypt-adapter';
import { JwtEncrypter } from './jwt-adapter';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from '../env/env.service';

@Module({
  providers: [
    {
      provide: BcryptAdapterRepository,
      useClass: BcryptAdapter,
    },
    {
      provide: JwtAdapterRepo,
      useClass: JwtEncrypter,
    },
    JwtService,
    EnvService,
  ],
  exports: [JwtAdapterRepo, BcryptAdapterRepository],
})
export class CryptoModule {}
