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
  document: z.string().max(30),
  email: z.string().max(140),
  phone: z.string().max(20),
  name: z.string().max(140),
});

type RegisterAssignorUserSchema = z.infer<
  typeof registerAssignorUserBodySchema
>;

@Controller("/integrations/assignor/register")
@Public()
export class RegisterAssignorUserController {
  constructor(
    private createAssignorService: CreateAssignorService,
  ) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(registerAssignorUserBodySchema))
    body: RegisterAssignorUserSchema
  ) {
    const { document, email, name, phone} = body;

    const result = await this.createAssignorService.execute({
      assignor: {
        document,
        email,
        name,
        phone,
      },
    });

    if (result.isLeft()) {
      const error = result.value;

      throw new BadRequestException(error.message);
    }
  }
}
