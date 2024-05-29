import { jwtDecode } from "jwt-decode";
import { IJwtDecoder } from "../application/interfaces/decoder.interface";
import { injectable } from "inversify";

@injectable()
export class JwtDecoder<T> implements IJwtDecoder<T> {
  decode(token: string): T {
    const data = jwtDecode(token);
    return data as T;
  }
}
