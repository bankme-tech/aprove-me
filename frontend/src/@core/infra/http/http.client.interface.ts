export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export type HttpRequestDTO<T = undefined> = {
  url: string;
  body: T;
  headers?: Record<string, string>;
};

export type HttpResponseDTO<T = undefined> = {
  statusCode: number;
  body: T;
};

export interface IHttpClient<T = unknown, R = unknown> {
  post: (params: HttpRequestDTO<T>) => Promise<HttpResponseDTO<R>>;
  get: (params: HttpRequestDTO<undefined>) => Promise<HttpResponseDTO<R>>;
  patch: (params: HttpRequestDTO<T>) => Promise<HttpResponseDTO<R>>;
  delete: (params: HttpRequestDTO<undefined>) => Promise<HttpResponseDTO<R>>;
}
