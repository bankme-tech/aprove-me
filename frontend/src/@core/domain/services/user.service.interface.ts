import {
  AuthInputDTO,
  AuthOutputDTO,
  DecodedToken,
  RegisterOutputDTO,
} from "../dtos/user.dto";

export interface IUserService {
  login(userInputDTO: AuthInputDTO): Promise<AuthOutputDTO>;
  register(userInputDTO: AuthInputDTO): Promise<RegisterOutputDTO>;
  decodeToken(token: string): DecodedToken;
}
