import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common";
import { RemoveAssignorService } from "@/domain/receivables/application/services/remove-assignor-service";

@Controller("/integrations/assignor/:id")
export class DeleteAssignorByIdController {
  constructor(private removeAssignorService: RemoveAssignorService) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param("id") id: string) {
    const result = await this.removeAssignorService.execute({
      id,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
