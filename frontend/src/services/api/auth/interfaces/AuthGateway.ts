export default interface AuthGateway {
    signIn(login: string, password: string): Promise<{ access_token: string }>;
}