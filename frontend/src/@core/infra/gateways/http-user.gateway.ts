import { inject, injectable } from "inversify";
import { type IHttpClient } from "../http/http.client.interface";
import { TYPES } from "../dependecy-injection/types";
import { IUserGateway } from "@/@core/domain/gateways/user.gateway";
import {
  AuthInputDTO,
  AuthOutputDTO,
  RegisterOutputDTO,
} from "@/@core/domain/dtos/user.dto";
import { UnauthorizedError } from "@/@core/domain/errors/unauthorized-error";
import { UserAlreadyExistsError } from "@/@core/domain/errors/user-already-exists-error";

@injectable()
export class HttpUserGateway implements IUserGateway {
  constructor(
    @inject(TYPES.IHttpClient)
    private readonly httpClient: IHttpClient<AuthInputDTO>
  ) {}

  async login(params: AuthInputDTO): Promise<AuthOutputDTO> {
    const response = await this.httpClient.post({
      url: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
      body: params,
    });

    if (response.statusCode === 401) {
      throw new UnauthorizedError();
    }

    return response.body as AuthOutputDTO;
  }

  async create(params: AuthInputDTO): Promise<RegisterOutputDTO> {
    const response = await this.httpClient.post({
      url: `${process.env.NEXT_PUBLIC_API_URL}/user`,
      body: params,
    });

    if (response.statusCode === 409) {
      throw new UserAlreadyExistsError();
    }

    return response.body as RegisterOutputDTO;
  }
}
