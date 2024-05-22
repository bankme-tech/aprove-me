import { Body, Controller, HttpCode, Post, UseGuards, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { z } from "zod";
import { CreateAssignorUseCase } from "src/domain/operations/application/use-cases/assignors/use-cases/create-assignor";
import { CreateReceivableUseCase } from "src/domain/operations/application/use-cases/recivables/use-cases/create-receivable";
import { JwtAuthGuard } from "src/infra/auth/jwt-auth.guard";

const createPayableBodySchema = z.object({
  receivable: z.object({
    value: z.number(),
    emissionDate: z.date().default(new Date()),
  }),

  assignor: z.object({
    document: z.string().max(30).min(1),
    email: z.string().max(140).min(1),
    phone: z.string().max(20).min(1),
    name: z.string().max(140).min(1)
  })
})

type CreatePayableBodySchema = z.infer<typeof createPayableBodySchema>

@Controller('/integrations/payable')
export class CreatePayableController {
  constructor(
    private createAssignor: CreateAssignorUseCase,
    private createReceivable: CreateReceivableUseCase
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPayableBodySchema))
  @UseGuards(JwtAuthGuard)
  async handle(@Body() body: CreatePayableBodySchema) {
    const { receivable, assignor } = body

    const { value: createdAssignor } = await this.createAssignor.execute({
      document: assignor.document,
      email: assignor.email,
      phone: assignor.phone,
      name: assignor.name
    })

    const { value: createdReceivable } = await this.createReceivable.execute({
      assignorId: createdAssignor.assignor.id.toString(),
      emissionDate: new Date(),
      value: receivable.value
    })

    return { 
      createdAssignor, 
      createdReceivable 
    }
  }
}