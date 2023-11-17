export interface IAuthService {
  signIn(username: string, pass: string): Promise<any>;
}
