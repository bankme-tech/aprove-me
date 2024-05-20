import { BcryptAdapterRepository } from '@/app/repositories/bcrypt-adapter-repository';

export class InMemoryBcryptRepository implements BcryptAdapterRepository {
  async genSalt(): Promise<string> {
    return 'fakeSalt';
  }
  async hash(text: string, salt: string): Promise<string> {
    return text.concat(salt);
  }
  async compare(text: string, hashTextToCompare: string): Promise<boolean> {
    return text === hashTextToCompare;
  }
}
