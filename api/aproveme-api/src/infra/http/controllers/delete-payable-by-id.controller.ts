import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common";
import { RemovePayableService } from "@/domain/receivables/application/services/remove-payable-service";

@Controller("/integrations/payable/:id")
export class DeletePayableByIdController {
  constructor(private removePayableService: RemovePayableService) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param("id") id: string) {
    const result = await this.removePayableService.execute({
      id,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
