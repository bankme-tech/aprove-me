import { CreatePayableInputDTO } from "@/@core/domain/dtos/payable.dto";
import { Payable } from "@/@core/domain/entities/payable.entity";
import { inject, injectable } from "inversify";
import { type IHttpClient } from "../http/http.client.interface";
import { TYPES } from "../dependecy-injection/types";
import { IPayableGateway } from "@/@core/domain/gateways/payable.gateway";

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
    });

    return response.body;
  }

  async findById(id: string): Promise<Payable | null> {
    const response = await this.httpClient.get({
      url: `${process.env.NEXT_PUBLIC_API_URL}/payable/${id}`,
      body: undefined,
    });

    return response.body;
  }
  findAll(): Promise<Payable[]> {
    throw new Error("Method not implemented.");
  }
}
