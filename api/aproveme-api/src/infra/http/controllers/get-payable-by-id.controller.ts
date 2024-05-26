import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";
import { FindPayableByIdService } from "@/domain/receivables/application/services/find-payable-by-id";
import { PayableWithAssignorPresenter } from "../presenters/payable-with-assignor-presenter";

@Controller("/integrations/payable/:id")
export class GetPayableByIdController {
  constructor(private findPayableService: FindPayableByIdService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param("id") id: string) {
    const result = await this.findPayableService.execute({
      id,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return {
      payableWithAssignor: PayableWithAssignorPresenter.toHTTP(result.value.payableWithAssignor),
    };
  }
}
