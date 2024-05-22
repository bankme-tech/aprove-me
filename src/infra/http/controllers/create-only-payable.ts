import { Body, Controller, HttpCode, Post, UseGuards, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { z } from "zod";
import { CreateReceivableUseCase } from "src/domain/operations/application/use-cases/recivables/use-cases/create-receivable";
import { JwtAuthGuard } from "src/infra/auth/jwt-auth.guard";

const createPayableBodySchema = z.object({
  assignorId: z.string().uuid(),
  emissionDate: z.date().default(new Date()),
  value: z.number(),
})

type CreatePayableBodySchema = z.infer<typeof createPayableBodySchema>

@Controller('/integrations/payable')
export class CreateOnlyPayableController {
  constructor(
    private createReceivable: CreateReceivableUseCase,
  ) {}

  @Post('/independent')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPayableBodySchema))
  @UseGuards(JwtAuthGuard)
  async handle(@Body() body: CreatePayableBodySchema) {
    const receivable = body

    const createdReceivable = await this.createReceivable.execute({
      assignorId: receivable.assignorId,
      emissionDate: new Date(),
      value: receivable.value
    })

    return { 
      createdReceivable,
    }
  }
}