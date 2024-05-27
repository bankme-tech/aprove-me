import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { jwtVerify } from "jose";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly secret: Uint8Array;

  constructor(configService: ConfigService) {
    const textEncoder = new TextEncoder();
    const secret = configService.getOrThrow("SECRET");
    this.secret = textEncoder.encode(secret);
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (typeof authorization !== "string") return false;

    const prefix = "Bearer ";
    if (!authorization.startsWith(prefix)) return false;
    const token = authorization.slice(prefix.length);
    if (token.length === 0) return false;

    try {
      await jwtVerify(token, this.secret);
      return true;
    } catch (error) {
      return false;
    }
  }
}
