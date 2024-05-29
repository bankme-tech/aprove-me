import { CreatePayableInputDTO } from "@/@core/domain/dtos/payable.dto";
import { Payable } from "@/@core/domain/entities/payable.entity";
import { inject, injectable } from "inversify";
import { type IHttpClient } from "../http/http.client.interface";
import { TYPES } from "../dependecy-injection/types";
import { IPayableGateway } from "@/@core/domain/gateways/payable.gateway";
import { UnauthorizedError } from "@/@core/domain/errors/unauthorized-error";

@injectable()
export class HttpPayableGateway implements IPayableGateway {
  constructor(
    @inject(TYPES.IHttpClient)
    private readonly httpClient: IHttpClient<CreatePayableInputDTO, Payable>
  ) {}

  async create(params: CreatePayableInputDTO): Promise<Payable> {
    const response = await this.httpClient.post({
      url: `${process.env.NEXT_PUBLIC_API_URL}/payable`,
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

  async findById(id: string): Promise<Payable | null> {
    const response = await this.httpClient.get({
      url: `${process.env.NEXT_PUBLIC_API_URL}/payable/${id}`,
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
  async findAll(): Promise<Payable[]> {
    const response = await this.httpClient.get({
      url: `${process.env.NEXT_PUBLIC_API_URL}/payable`,
      body: undefined,
      headers: {
        Authorization: `Bearer ${this.getTokenFromLocalStorage()}`,
      },
    });

    if (response.statusCode === 401) {
      throw new UnauthorizedError();
    }

    return response.body as unknown as Payable[];
  }

  async update(id: string, params: CreatePayableInputDTO): Promise<void> {
    const response = await this.httpClient.patch({
      url: `${process.env.NEXT_PUBLIC_API_URL}/payable/${id}`,
      body: params,
      headers: {
        Authorization: `Bearer ${this.getTokenFromLocalStorage()}`,
      },
    });

    if (response.statusCode === 401) {
      throw new UnauthorizedError();
    }
  }

  async delete(id: string): Promise<void> {
    const response = await this.httpClient.delete({
      url: `${process.env.NEXT_PUBLIC_API_URL}/payable/${id}`,
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
