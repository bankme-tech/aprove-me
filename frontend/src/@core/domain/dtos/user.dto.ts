import { User } from "../entities/user.entity";

export type AuthInputDTO = Pick<User, "login" | "password">;

export type AuthOutputDTO = {
  token: string;
};

export type RegisterInputDTO = AuthInputDTO;

export type RegisterOutputDTO = Pick<User, "id" | "login">;

export type DecodedToken = {
  login: string;
  password: string;
  iat: number;
  exp: number;
};
