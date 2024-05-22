import { Body, Controller, HttpCode, Post, UseGuards, UsePipes } from "@nestjs/common";
import { hash } from "bcryptjs";
import { z } from 'zod'
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { CreateAccountUseCase } from "src/domain/operations/application/use-cases/authentication/use-cases/create-account";
import { JwtAuthGuard } from "src/infra/auth/jwt-auth.guard";

const createAccountBodySchema = z.object({
  login: z.string(),
  password: z.string().min(6)
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(
    private createAccount: CreateAccountUseCase
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @UseGuards(JwtAuthGuard)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { login, password } = body
    const hashedPassword = await hash(password, 8)

    const result = await this.createAccount.execute({
      login,
      password: hashedPassword
    })
    
    if (result.isLeft()) {
      return {
        message: 'Failed to create the user'
      }
    }

    return {
      message: 'User created!'
    }
  }
}