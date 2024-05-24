export abstract class HashGenerator {
  abstract hash(plain: string): Promise<string>;
  abstract matches(hashed: string, plain: string): Promise<boolean>;
}
