import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CryptoModule } from 'src/app/crypto/crypto.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [DbModule, CryptoModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
