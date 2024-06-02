export abstract class PermissionRepository {
  public abstract findBy(
    login: string,
    password: string,
  ): Promise<{ login: string; password: string } | null>;

  public abstract register(login: string, password: string): Promise<void>;
}
