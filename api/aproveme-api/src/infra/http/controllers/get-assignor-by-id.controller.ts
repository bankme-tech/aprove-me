import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";
import { AssignorPresenter } from "../presenters/assignor-presenter";
import { FindAssignorByIdService } from "@/domain/receivables/application/services/find-assignor-by-id";

@Controller("/integrations/assignor/:id")
export class GetAssignorByIdController {
  constructor(private findAssignorService: FindAssignorByIdService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param("id") id: string) {
    const result = await this.findAssignorService.execute({
      id,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return {
      assignor: AssignorPresenter.toHTTP(result.value.assignor),
    };
  }
}
