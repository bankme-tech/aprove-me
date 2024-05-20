import { Module } from '@nestjs/common';
import { BcryptAdapterRepository } from '@/app/repositories/bcrypt-adapter-repository';
import { BcryptAdapter } from '@/app/adapters/bcrypt-adapter';
import { JwtAdapter } from '@/app/adapters/jwt.adapter';
import { JwtAdapterRepository } from '@/app/repositories/jwt-adapter.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    {
      provide: BcryptAdapterRepository,
      useClass: BcryptAdapter,
    },
    {
      provide: JwtAdapterRepository,
      useClass: JwtAdapter,
    },
    JwtService,
  ],
  exports: [BcryptAdapterRepository, JwtAdapterRepository],
})
export class AdaptersModule {}
