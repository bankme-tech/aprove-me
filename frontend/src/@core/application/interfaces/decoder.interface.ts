export interface IJwtDecoder<T> {
  decode(token: string): T;
}
