import { Body, Controller, HttpCode, Param, Patch } from "@nestjs/common";
import { z } from "zod";
import { EditAssignorUseCase } from "src/domain/operations/application/use-cases/assignors/use-cases/edit-assignor";

const editAssignorParamsSchema = z.string().uuid()

const editAssignorBodySchema = z.object({
  document: z.string().max(30).optional(),
  email: z.string().max(140).optional(),
  phone: z.string().max(20).optional(),
  name: z.string().max(140).optional()
})

type EditAssignorBodySchema = z.infer<typeof editAssignorBodySchema>
type EditAssignorParamSchema = z.infer<typeof editAssignorParamsSchema>

@Controller('/integrations/assignor')
export class EditAssignorController {
  constructor(
    private editAssignor: EditAssignorUseCase,
  ) {}

  @Patch('/:id')
  @HttpCode(200)
  async handle(@Param('id') id: EditAssignorParamSchema, @Body() body: EditAssignorBodySchema) {
    const { document, email, phone, name } = body;

    const updatedFields = {
      document,
      email,
      phone,
      name
    };

    const { value: editAssignor } = await this.editAssignor.execute({
      assignorId: id,
      ...updatedFields
    });

    return editAssignor;
  }
}
