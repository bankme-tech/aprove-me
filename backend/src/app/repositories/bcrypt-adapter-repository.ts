export abstract class BcryptAdapterRepository {
  abstract genSalt(): Promise<string>;
  abstract hash(text: string, salt: string): Promise<string>;
  abstract compare(text: string, hashTextToCompare: string): Promise<boolean>;
}
