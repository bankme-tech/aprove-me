import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { BcryptAdapterRepository } from 'src/repositories';

@Injectable()
export class BcryptAdapter implements BcryptAdapterRepository {
  private HASH_SALT = 8;

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }

  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT);
  }
}
