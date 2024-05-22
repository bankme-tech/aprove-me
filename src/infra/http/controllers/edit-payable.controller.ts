import { Body, Controller, HttpCode, Param, Patch } from "@nestjs/common";
import { z } from "zod";
import { EditReceivableUseCase } from "src/domain/operations/application/use-cases/recivables/use-cases/edit-receivable";

const editReceivableParamsSchema = z.string().uuid()

const editReceivableBodySchema = z.object({
  value: z.number(),
})

type EditReceivableBodySchema = z.infer<typeof editReceivableBodySchema>
type EditReceivableParamSchema = z.infer<typeof editReceivableParamsSchema>

@Controller('/integrations/payable')
export class EditRecevableController {
  constructor(
    private editReceivable: EditReceivableUseCase,
  ) {}

  @Patch('/:id')
  @HttpCode(200)
  async handle(@Param('id') id: EditReceivableParamSchema, @Body() body: EditReceivableBodySchema) {
    const { value } = body;

    const updatedFields = {
      value
    };

    const { value: editReceivable } = await this.editReceivable.execute({
      receivableId: id,
      ...updatedFields
    });

    return editReceivable;
  }
}
