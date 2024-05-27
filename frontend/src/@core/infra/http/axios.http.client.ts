import axios from "axios";
import {
  IHttpClient,
  HttpRequestDTO,
  HttpResponseDTO,
  HttpMethod,
} from "./http.client.interface";
import { injectable } from "inversify";

@injectable()
export class AxiosHttpClient<T, R> implements IHttpClient<T, R> {
  async get(params: HttpRequestDTO<undefined>): Promise<HttpResponseDTO<R>> {
    const response = await axios.request({
      url: params.url,
      method: HttpMethod.GET,
    });

    return {
      statusCode: response.status,
      body: response.data,
    };
  }

  async post(params: HttpRequestDTO<T>): Promise<HttpResponseDTO<R>> {
    const response = await axios.request({
      url: params.url,
      method: HttpMethod.POST,
      data: params.body,
    });

    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}
