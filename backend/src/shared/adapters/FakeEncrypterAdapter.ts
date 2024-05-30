import { Encrypter } from './Encrypter';

export class FakeEncrypterAdapter implements Encrypter {
  async hash(_value: string) {
    return 'encrypted_password';
  }

  async compare(_value: string, _hash: string) {
    return true;
  }
}
