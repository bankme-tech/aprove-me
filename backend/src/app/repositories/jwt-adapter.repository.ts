export abstract class JwtAdapterRepository {
  abstract signAsync(token: Record<string, string>): Promise<string>;
}
