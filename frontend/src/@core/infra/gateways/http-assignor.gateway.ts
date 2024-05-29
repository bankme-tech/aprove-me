import { inject, injectable } from "inversify";
import { type IHttpClient } from "../http/http.client.interface";
import { TYPES } from "../dependecy-injection/types";
import { CreateAssignorInputDTO } from "@/@core/domain/dtos/assignor.dto";
import { Assignor } from "@/@core/domain/entities/assignor.entity";
import { IAssignorGateway } from "@/@core/domain/gateways/assignor.gateway";
import { UnauthorizedError } from "@/@core/domain/errors/unauthorized-error";

@injectable()
export class HttpAssignorGateway implements IAssignorGateway {
  constructor(
    @inject(TYPES.IHttpClient)
    private readonly httpClient: IHttpClient<CreateAssignorInputDTO, Assignor>
  ) {}

  async create(params: CreateAssignorInputDTO): Promise<Assignor> {
    const response = await this.httpClient.post({
      url: `${process.env.NEXT_PUBLIC_API_URL}/assignor`,
      body: params,
      headers: {
        Authorization: `Bearer ${this.getTokenFromLocalStorage()}`,
      },
    });

    if (response.statusCode === 401) {
      throw new UnauthorizedError();
    }

    return response.body;
  }

  async findById(id: string): Promise<Assignor | null> {
    const response = await this.httpClient.get({
      url: `${process.env.NEXT_PUBLIC_API_URL}/assignor/${id}`,
      body: undefined,
      headers: {
        Authorization: `Bearer ${this.getTokenFromLocalStorage()}`,
      },
    });

    if (response.statusCode === 401) {
      throw new UnauthorizedError();
    }

    return response.body;
  }
  async findAll(): Promise<Assignor[]> {
    const response = await this.httpClient.get({
      url: `${process.env.NEXT_PUBLIC_API_URL}/assignor`,
      body: undefined,
      headers: {
        Authorization: `Bearer ${this.getTokenFromLocalStorage()}`,
      },
    });

    if (response.statusCode === 401) {
      throw new UnauthorizedError();
    }

    return response.body as unknown as Assignor[];
  }

  async update(id: string, params: CreateAssignorInputDTO): Promise<Assignor> {
    const response = await this.httpClient.patch({
      url: `${process.env.NEXT_PUBLIC_API_URL}/assignor/${id}`,
      body: params,
      headers: {
        Authorization: `Bearer ${this.getTokenFromLocalStorage()}`,
      },
    });

    if (response.statusCode === 401) {
      throw new UnauthorizedError();
    }

    return response.body;
  }

  async delete(id: string): Promise<void> {
    const response = await this.httpClient.delete({
      url: `${process.env.NEXT_PUBLIC_API_URL}/assignor/${id}`,
      body: undefined,
      headers: {
        Authorization: `Bearer ${this.getTokenFromLocalStorage()}`,
      },
    });

    if (response.statusCode === 401) {
      throw new UnauthorizedError();
    }
  }

  private getTokenFromLocalStorage() {
    return localStorage.getItem("accessToken");
  }
}
