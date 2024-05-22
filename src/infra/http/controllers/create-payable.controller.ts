import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { z } from "zod";
import { CreateAssignorUseCase } from "src/domain/operations/application/use-cases/assignors/use-cases/create-assignor";

const createPayableBodySchema = z.object({
  receivable: z.object({
    receivableId: z.string().uuid(),
    value: z.number(),
    emissionDate: z.date().default(new Date()),
    assignor: z.string().uuid()
  }),

  assignor: z.object({
    assignorId: z.string().uuid(),
    document: z.string().max(30),
    email: z.string().max(140),
    phone: z.string().max(20),
    name: z.string().max(140)
  })
})

type CreatePayableBodySchema = z.infer<typeof createPayableBodySchema>

@Controller('/integrations/payable')
export class CreatePayableController {
  constructor(
    private createAssignor: CreateAssignorUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(createPayableBodySchema))
  async handle(@Body() body: CreatePayableBodySchema) {
    const { receivable, assignor } = body

    

    return {}
  }
}