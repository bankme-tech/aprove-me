import {
  AuthInputDTO,
  AuthOutputDTO,
  RegisterOutputDTO,
} from "../dtos/user.dto";

export interface IUserGateway {
  login(userInputDTO: AuthInputDTO): Promise<AuthOutputDTO>;
  create(userInputDTO: AuthInputDTO): Promise<RegisterOutputDTO>;
}
