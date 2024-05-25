import { randomUUID } from 'crypto';
import { makeUserDTO } from '../dtos.mock';
import { UserEntity } from 'src/user/entities/user.entity';

export const makeUserEntity = (): UserEntity => {
  const { login, password } = makeUserDTO();
  return {
    id: randomUUID(),
    login,
    password,
  };
};
