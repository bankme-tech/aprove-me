import { IUserAuth } from "./IUserAuth";

export interface IUserCredentials {
  accessToken: string;
  user: IUserAuth;
}
