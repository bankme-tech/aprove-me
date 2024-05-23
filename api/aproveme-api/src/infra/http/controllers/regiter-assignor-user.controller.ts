import { CreateAssignorService } from "@/domain/receivables/application/services/create-assignor-service";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { Public } from "@/infra/auth/public";
import { RegisterUserService } from "@/domain/account/application/services/register-user";
import { UserAlreadyExistsError } from "@/domain/account/application/services/errors/user-already-exists-error";

const registerAssignorUserBodySchema = z.object({
  user: z.object({
    login: z.string(),
    password: z.string(),
  }),
  assignor: z.object({
    document: z.string().max(30),
    email: z.string().max(140),
    phone: z.string().max(20),
    name: z.string().max(140),
  }),
});

type RegisterAssignorUserSchema = z.infer<
  typeof registerAssignorUserBodySchema
>;

@Controller("/integrations/auth")
@Public()
export class RegisterAssignorUserController {
  constructor(
    private createAssignorService: CreateAssignorService,
    private registerUserService: RegisterUserService
  ) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(registerAssignorUserBodySchema))
    body: RegisterAssignorUserSchema
  ) {
    const { user, assignor } = body;

    const userResult = await this.registerUserService.execute({
      login: user.login,
      password: user.password,
    });

    console.log(userResult.value);

    if (userResult.isLeft()) {
      const error = userResult.value;

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const assignorResult = await this.createAssignorService.execute({
      assignor: {
        userId: userResult.value.user.id.toString(),
        document: assignor.document,
        email: assignor.email,
        name: assignor.name,
        phone: assignor.phone,
      },
    });

    console.log(assignorResult.value);

    if (assignorResult.isLeft()) {
      const error = assignorResult.value;

      throw new BadRequestException(error.message);
    }
  }
}
