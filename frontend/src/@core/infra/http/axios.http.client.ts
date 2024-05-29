import axios, { AxiosResponse } from "axios";
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
    let response: AxiosResponse;
    try {
      response = await axios.request({
        url: params.url,
        method: HttpMethod.GET,
        headers: params.headers,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        response = error.response as AxiosResponse;
      } else {
        throw error;
      }
    }
    return {
      statusCode: response.status,
      body: response.data,
    };
  }

  async post(params: HttpRequestDTO<T>): Promise<HttpResponseDTO<R>> {
    let response: AxiosResponse;
    try {
      response = await axios.request({
        url: params.url,
        method: HttpMethod.POST,
        data: params.body,
        headers: params.headers,
      });

      return {
        statusCode: response.status,
        body: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        response = error.response as AxiosResponse;
      } else {
        throw error;
      }
    }
    return {
      statusCode: response.status,
      body: response.data,
    };
  }

  async patch(params: HttpRequestDTO<T>): Promise<HttpResponseDTO<R>> {
    let response: AxiosResponse;
    try {
      response = await axios.request({
        url: params.url,
        method: HttpMethod.PATCH,
        data: params.body,
        headers: params.headers,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        response = error.response as AxiosResponse;
      } else {
        throw error;
      }
    }
    return {
      statusCode: response.status,
      body: response.data,
    };
  }

  async delete(params: HttpRequestDTO<undefined>): Promise<HttpResponseDTO<R>> {
    let response: AxiosResponse;
    try {
      response = await axios.request({
        url: params.url,
        method: HttpMethod.DELETE,
        headers: params.headers,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        response = error.response as AxiosResponse;
      } else {
        throw error;
      }
    }
    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}
