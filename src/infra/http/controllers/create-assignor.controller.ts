import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { z } from "zod";
import { CreateAssignorUseCase } from "src/domain/operations/application/use-cases/assignors/use-cases/create-assignor";

const createAssignorBodySchema = z.object({
  document: z.string().max(30).min(1),
  email: z.string().max(140).min(1),
  phone: z.string().max(20).min(1),
  name: z.string().max(140).min(1)
})

type CreateAssignorBodySchema = z.infer<typeof createAssignorBodySchema>

@Controller('/integrations/assignor')
export class CreateAssignorController {
  constructor(
    private createAssignor: CreateAssignorUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAssignorBodySchema))
  async handle(@Body() body: CreateAssignorBodySchema) {
    const assignor = body

    const { value: createdAssignor } = await this.createAssignor.execute({
      document: assignor.document,
      email: assignor.email,
      phone: assignor.phone,
      name: assignor.name
    })

    return { 
      createdAssignor,
    }
  }
}