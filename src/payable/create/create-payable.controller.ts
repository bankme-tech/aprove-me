import { Body, Controller, Post } from "@nestjs/common";
import { Assignor, Payable } from "@prisma/client";

import { Auth } from "../../auth/auth.decorator";
import { ZodPipe } from "../../pipes/zod.pipe";
import { PrismaProvider } from "../../providers/prisma.provider";
import { CreatePayableInputDTO } from "./create-payable-input.dto";
import { CreatePayableInputSchema } from "./create-payable-input.schema";

@Controller()
export class CreatePayableController {
  constructor(private readonly prisma: PrismaProvider) {}

  @Auth()
  @Post("integrations/payable")
  async handle(
    @Body(new ZodPipe(CreatePayableInputSchema)) input: CreatePayableInputDTO,
  ) {
    const upsertAssignorPromise = this.prisma.assignor.upsert({
      where: {
        id: input.assignor.id,
      },
      create: {
        id: input.assignor.id,
        document: input.assignor.document,
        email: input.assignor.email,
        phone: input.assignor.phone,
        name: input.assignor.name,
      },
      update: {
        document: input.assignor.document,
        email: input.assignor.email,
        phone: input.assignor.phone,
        name: input.assignor.name,
      },
    });

    const upsertPayablePromise = this.prisma.payable.upsert({
      where: {
        id: input.id,
      },
      create: {
        id: input.id,
        value: input.value,
        emissionDate: input.emissionDate,
        assignorId: input.assignor.id,
      },
      update: {
        value: input.value,
        emissionDate: input.emissionDate,
        assignorId: input.assignor.id,
      },
    });

    const [assignor, payable] = await this.prisma.$transaction([
      upsertAssignorPromise,
      upsertPayablePromise,
    ]);

    const output: Payable & { assignor: Assignor } = {
      id: payable.id,
      value: payable.value,
      emissionDate: payable.emissionDate,
      assignorId: payable.assignorId,
      assignor: {
        id: assignor.id,
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      },
    };

    return output;
  }
}
