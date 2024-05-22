import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { AuthenticateAccountUseCase } from "src/domain/operations/application/use-cases/authentication/use-cases/authenticate";

 const authenticateBodySchema = z.object({
   login: z.string(),
   password: z.string().min(6)
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private authenticateAccountUseCase: AuthenticateAccountUseCase
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { login, password } = body

    const { value, isLeft } = await this.authenticateAccountUseCase.execute({
      login,
      password
    })

    if (isLeft()) {
      return {
        message: 'failed to authenticate account'
      }
    }

    return { value }
  }
}