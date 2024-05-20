import { JwtAdapterRepository } from '@/app/repositories/jwt-adapter.repository';

export class InMemoryJwtAdapterRepository implements JwtAdapterRepository {
  async signAsync(token: Record<string, string>): Promise<string> {
    return JSON.stringify(token);
  }
}
