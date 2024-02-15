export abstract class JwtAdapterRepo {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>;
}
