import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from "zod";
import { randomUUID } from "node:crypto";

import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { CreatePayableService } from "@/domain/receivables/application/services/create-payable-service";
import { PayablePresenter } from "../presenters/payable-presenter";

const receivePayableAndAssignorSchema = z.object({
  value: z.number(),
  emissionDate: z.string(),
  assignorId: z.string().uuid(),
});

type ReceivePayableAndAssignorBodySchema = z.infer<
  typeof receivePayableAndAssignorSchema
>;

@Controller("/integrations/payable")
export class ReceivePayableAndAssignorController {
  constructor(private createPayable: CreatePayableService) {}

  @Post()
  @HttpCode(200)
  async handle(
    @Body(new ZodValidationPipe(receivePayableAndAssignorSchema))
    body: ReceivePayableAndAssignorBodySchema
  ) {
    const { assignorId, emissionDate, value } = body;

    const createPayableResult = await this.createPayable.execute({
      payable: {
        id: randomUUID(),
        assignorId,
        emissionDate: new Date(emissionDate),
        value,
      },
    });

    return {
      payable: PayablePresenter.toHTTP(createPayableResult.value.payable),
    };
  }
}
