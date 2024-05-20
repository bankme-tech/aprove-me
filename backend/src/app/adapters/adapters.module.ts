import { Module } from '@nestjs/common';
import { BcryptAdapterRepository } from '@/app/repositories/bcrypt-adapter-repository';
import { BcryptAdapter } from '@/app/adapters/bcrypt-adapter';

@Module({
  providers: [
    {
      provide: BcryptAdapterRepository,
      useClass: BcryptAdapter,
    },
  ],
  exports: [BcryptAdapterRepository],
})
export class AdaptersModule {}
