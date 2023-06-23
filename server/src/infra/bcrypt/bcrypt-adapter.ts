import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const SALT_ROUTES = 12;

@Injectable()
export class BcryptAdapter {
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, SALT_ROUTES);
  }

  async compare(item: any, itemToCompare: any): Promise<boolean> {
    return await bcrypt.compare(item, itemToCompare);
  }
}
