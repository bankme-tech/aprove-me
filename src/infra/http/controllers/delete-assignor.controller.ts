import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { z } from "zod";
import { DeleteAssignorUseCase } from "src/domain/operations/application/use-cases/assignors/use-cases/delete-assignor";

const deleteAssignorParamsSchema = z.string().uuid()

type DeleteAssignorParamSchema = z.infer<typeof deleteAssignorParamsSchema>

@Controller('/integrations/assignor')
export class DeleteAssignorController {
  constructor(
    private deleteAssignor: DeleteAssignorUseCase
  ) {}

  @Delete('/:id')
  @HttpCode(204)
  async handle(@Param('id') id: DeleteAssignorParamSchema) {
    const { isLeft } = await this.deleteAssignor.execute({
      assignorId: id
    })

    if (isLeft()) {
      throw new Error('Resource not found error.')
    }
    
    return {}
  }
}