import { Injectable } from '@nestjs/common';
import { BcryptAdapterRepository } from '@/app/repositories/bcrypt-adapter-repository';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class BcryptAdapter implements BcryptAdapterRepository {
  async genSalt(): Promise<string> {
    return await genSalt();
  }

  async hash(text: string, salt: string): Promise<string> {
    return await hash(text, salt);
  }

  async compare(text: string, hashTextToCompare: string): Promise<boolean> {
    return await compare(text, hashTextToCompare);
  }
}
