import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { z } from "zod";
import { DeleteReceivableUseCase } from "src/domain/operations/application/use-cases/recivables/use-cases/delete-receivable";

const deletePayableParamsSchema = z.string().uuid()

type DeletePayableParamSchema = z.infer<typeof deletePayableParamsSchema>

@Controller('/integrations/payable')
export class DeleteReceivableController {
  constructor(
    private deleteReceivable: DeleteReceivableUseCase
  ) {}

  @Delete('/:id')
  @HttpCode(204)
  async handle(@Param('id') id: DeletePayableParamSchema) {
    const { isLeft } = await this.deleteReceivable.execute({
      receivableId: id
    })

    if (isLeft()) {
      throw new Error('Resource not found error.')
    }
    
    return {}
  }
}