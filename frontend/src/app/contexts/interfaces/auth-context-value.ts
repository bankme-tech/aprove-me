export interface AuthContextValue {
  signedIn: boolean;
  signin: (accessToken: string) => void;
  signout: () => void;
}
