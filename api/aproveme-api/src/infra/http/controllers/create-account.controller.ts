import { RegisterUserService } from "@/domain/account/application/services/register-user";
import { Public } from "@/infra/auth/public";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/domain/account/application/services/errors/user-already-exists-error";

const createAccountBodySchema = z.object({
  login: z.string(),
  password: z.string(),
});
type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller("/integrations/auth")
@Public()
export class CreateAccountController {
  constructor(private registerUser: RegisterUserService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(createAccountBodySchema))
    body: CreateAccountBodySchema
  ) {
    const { login, password } = body;

    const result = await this.registerUser.execute({
      login,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
