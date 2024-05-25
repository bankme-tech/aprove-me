import { AuthService } from 'src/auth/auth.service';
import { PrismaDatabaseHelper } from './prisma-database.e2e';
import { UserEntity } from 'src/user/entities/user.entity';
import { makeUserEntity } from 'test/mocks/entities/user.entity.mock';
import { IUserEncrypter } from 'src/user/encrypters/user.encrypter.interface';

export const makeAuthHeader = async (
  prismaDatabaseHelper: PrismaDatabaseHelper,
  encrypter: IUserEncrypter,
  authService: AuthService,
): Promise<string> => {
  const { id, login, password } = makeUserEntity();
  const hashedPassword = await encrypter.hash(password);
  await prismaDatabaseHelper.addUser(new UserEntity(id, login, hashedPassword));
  const { token } = await authService.authenticate({
    login,
    password,
  });
  return `Bearer ${token}`;
};
