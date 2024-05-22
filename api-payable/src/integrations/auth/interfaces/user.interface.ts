export interface IUnsafeUser {
  login: string;

  // Sensitive data that should not be selected
  password: string;
  salt: string;
}

type IUserSensitiveData = Pick<IUnsafeUser, 'password' | 'salt'>;
export type IUser = Omit<IUnsafeUser, keyof IUserSensitiveData>;
export type ICredentials = Pick<IUnsafeUser, 'login' | 'password'>;
