import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from "zod";
import { randomUUID } from "node:crypto";

import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { CreatePayableService } from "@/domain/receivables/application/services/create-payable-service";
import { PayablePresenter } from "../presenters/payable-presenter";

const receivePayableSchema = z.object({
  value: z.number(),
  emissionDate: z.string(),
  assignorId: z.string().uuid(),
});

type ReceivePayableBodySchema = z.infer<
  typeof receivePayableSchema
>;

@Controller("/integrations/payable")
export class ReceivePayableController {
  constructor(private createPayable: CreatePayableService) {}

  @Post()
  @HttpCode(200)
  async handle(
    @Body(new ZodValidationPipe(receivePayableSchema))
    body: ReceivePayableBodySchema
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
