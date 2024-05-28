import {
  AuthInputDTO,
  AuthOutputDTO,
  RegisterOutputDTO,
} from "@/@core/domain/dtos/user.dto";
import type { IUserGateway } from "@/@core/domain/gateways/user.gateway";
import { IUserService } from "@/@core/domain/services/user.service.interface";
import { TYPES } from "@/@core/infra/dependecy-injection/types";
import { inject, injectable } from "inversify";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IUserGateway)
    private readonly userGateway: IUserGateway
  ) {}

  async login(data: AuthInputDTO): Promise<AuthOutputDTO> {
    const result = await this.userGateway.login(data);
    return result;
  }

  async register(userInputDTO: AuthInputDTO): Promise<RegisterOutputDTO> {
    return await this.userGateway.create(userInputDTO);
  }
}
