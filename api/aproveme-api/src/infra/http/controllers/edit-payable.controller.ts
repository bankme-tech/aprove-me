import { EditPayableService } from "@/domain/receivables/application/services/edit-payable-service";
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

const editPayableBodySchema = z.object({
  value: z.number(),
});
type EditPayableBodySchema = z.infer<typeof editPayableBodySchema>;

@Controller("/integrations/payable/:id")
export class EditPayableController {
  constructor(private editPayableService: EditPayableService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(new ZodValidationPipe(editPayableBodySchema))
    body: EditPayableBodySchema,
    @Param("id") id: string
  ) {
    const { value } = body;

    const result = await this.editPayableService.execute({
      id,
      value,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
