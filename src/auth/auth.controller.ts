import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SignJWT } from "jose";

import { ZodPipe } from "../pipes/zod.pipe";
import { AuthInputDTO } from "./auth-input.dto";
import { AuthInputSchema } from "./auth-input.schema";

@Controller()
export class AuthController {
  private readonly secret: Uint8Array;

  constructor(configService: ConfigService) {
    const textEncoder = new TextEncoder();
    const secret = configService.getOrThrow("SECRET");
    this.secret = textEncoder.encode(secret);
  }

  @Post("integrations/auth")
  async handle(@Body(new ZodPipe(AuthInputSchema)) input: AuthInputDTO) {
    const authenticated =
      input.login === "aprovame" && input.password === "aprovame";

    if (!authenticated) {
      throw new BadRequestException("invalid credentials");
    }

    const accessToken = await new SignJWT()
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(input.login)
      .setIssuedAt()
      .setExpirationTime("60s")
      .sign(this.secret);

    return { accessToken };
  }
}
