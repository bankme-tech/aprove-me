import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SignJWT } from "jose";

import { ZodPipe } from "../pipes/zod.pipe";
import { PrismaProvider } from "../providers/prisma.provider";
import { AuthInputDTO } from "./auth-input.dto";
import { AuthInputSchema } from "./auth-input.schema";

@Controller()
export class AuthController {
  private readonly secret: Uint8Array;
  private readonly prisma: PrismaProvider;

  constructor(configService: ConfigService, prisma: PrismaProvider) {
    const textEncoder = new TextEncoder();
    const secret = configService.getOrThrow("SECRET");
    this.secret = textEncoder.encode(secret);
    this.prisma = prisma;
  }

  @Post("integrations/auth")
  async handle(@Body(new ZodPipe(AuthInputSchema)) input: AuthInputDTO) {
    const permission = await this.prisma.permission.findFirst({
      where: {
        login: input.login,
        password: input.password,
      },
    });

    if (permission === null) {
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
