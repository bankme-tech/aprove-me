export interface AuthResponse {
  accessToken: string;
}

export interface AuthParams {
  login: string;
  password: string;
}

export interface SigninResponse extends AuthResponse {}
