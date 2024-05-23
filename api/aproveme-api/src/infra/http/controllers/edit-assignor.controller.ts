import { EditAssignorService } from "@/domain/receivables/application/services/edit-assignor-service";
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { CurrentUser } from "@/infra/auth/current-user-decorator";

const editAssignorBodySchema = z.object({
  document: z.string().max(30).nullable(),
  email: z.string().max(140).nullable(),
  phone: z.string().max(20).nullable(),
  name: z.string().max(140).nullable(),
});
type EditAssignorBodySchema = z.infer<typeof editAssignorBodySchema>;

@Controller("/integrations/assignor/:id")
export class EditAssignorController {
  constructor(private editAssignorService: EditAssignorService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(new ZodValidationPipe(editAssignorBodySchema))
    body: EditAssignorBodySchema,
    @Param("id") id: string
  ) {
    const { document, email, name, phone } = body;

    const result = await this.editAssignorService.execute({
      id,
      document,
      email,
      name,
      phone,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
