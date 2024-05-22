import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  async hash(value: string, salt: number) {
    return bcrypt.hash(value, salt);
  }

  async compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
