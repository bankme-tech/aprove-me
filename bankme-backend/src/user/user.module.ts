import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CryptoModule } from 'src/crypto/crypto.module';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [DbModule, CryptoModule],
  providers: [UserService, UserRepository]
})
export class UserModule {}
