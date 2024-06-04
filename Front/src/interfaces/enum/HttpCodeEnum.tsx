export type HttpCodeEnumType = number;

interface IHttpCode {
  code: number;
  type: string;
}

const HttpCodeValues: {
  [T in HttpCodeEnumType]: IHttpCode;
} = {
  400: { code: 400, type: "Bad Request" },
  401: { code: 401, type: "Unauthorized" },
  403: { code: 403, type: "Forbidden" },
  404: { code: 404, type: "Not found" },
  405: { code: 405, type: "Not allowed" },
  408: { code: 408, type: "Timeout" },
  409: { code: 409, type: "Conflict" },
  413: { code: 413, type: "Payload Too Large" },
  415: { code: 415, type: "Unsupported Media Type" },
  429: { code: 429, type: "Too Many Requests" },
  500: { code: 500, type: "Internal Server Error" },
  501: { code: 501, type: "Not Implemented" },
  502: { code: 502, type: "Bad Gateway" },
  503: { code: 503, type: "Service Unavaliable" },
  504: { code: 504, type: "Gateway Timeout" }
};

export class HttpCodeEnum {
  static getValues(): IHttpCode[] {
    return Object.values(HttpCodeValues);
  }
}
