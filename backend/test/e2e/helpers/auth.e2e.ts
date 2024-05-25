import { AuthService } from 'src/auth/auth.service';

export const makeAuthHeader = async (
  authService: AuthService,
): Promise<string> => {
  const { token } = await authService.authenticate({
    login: 'aprovame',
    password: 'aprovame',
  });
  return `Bearer ${token}`;
};
