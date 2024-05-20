import { User, UserProps } from '@/app/entities/user';

export function makeUser(override: Partial<UserProps> = {}): User {
  return new User({
    login: 'test',
    password: 'password!A1',
    ...override,
  });
}
