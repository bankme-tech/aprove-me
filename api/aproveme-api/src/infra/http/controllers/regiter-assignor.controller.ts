import { CreateAssignorService } from "@/domain/receivables/application/services/create-assignor-service";
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { Public } from "@/infra/auth/public";

const registerAssignorBodySchema = z.object({
  document: z.string().max(30),
  email: z.string().max(140),
  phone: z.string().max(20),
  name: z.string().max(140),
});

type RegisterAssignorSchema = z.infer<typeof registerAssignorBodySchema>;

@Controller("/integrations/assignor/register")
@Public()
export class RegisterAssignorController {
  constructor(private createAssignor: CreateAssignorService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(registerAssignorBodySchema))
    body: RegisterAssignorSchema
  ) {
    const { document, email, name, phone } = body;

    const result = await this.createAssignor.execute({
      assignor: {
        document,
        email,
        name,
        phone,
      },
    });

    if (result.isLeft()) {
      const error = result.value;

      throw new BadRequestException(error.message);
    }
  }
}
