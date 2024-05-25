import { IUserEncrypter } from './user.encrypter.interface';
import { compare, hash } from 'bcrypt';

export class BcryptUserEncrypter implements IUserEncrypter {
  async hash(value: string): Promise<string> {
    return await hash(value, 10);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }
}
