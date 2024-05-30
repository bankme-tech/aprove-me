import { Injectable } from '@nestjs/common';
import { hash as bcryptHash, compare, genSalt } from 'bcrypt';
import { Encrypter } from './Encrypter';

@Injectable()
export class BcryptAdapter implements Encrypter {
  async hash(value: string) {
    const salt = await genSalt();
    const hash = await bcryptHash(value, salt);
    return hash;
  }

  async compare(value: string, hash: string) {
    const isMatch = await compare(value, hash);
    return isMatch;
  }
}
