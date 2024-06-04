import { Public } from "@/infra/auth/public";
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { AuthenticateUserService } from "@/domain/account/application/services/authenticate-user";
import { WrongCredentialsError } from "@/domain/account/application/services/errors/wrong-credentials-error";

const authenticateBodySchema = z.object({
  login: z.string(),
  password: z.string(),
});
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller("/integrations/sessions")
@Public()
export class AuthenticateController {
  constructor(private authUser: AuthenticateUserService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(authenticateBodySchema))
    body: AuthenticateBodySchema
  ) {
    const { login, password } = body;

    const result = await this.authUser.execute({
      login,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { accessToken } = result.value;

    return {
      access_token: accessToken,
    };
  }
}
