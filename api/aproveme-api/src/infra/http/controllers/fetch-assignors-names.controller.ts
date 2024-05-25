import { FetchAssignorsNamesService } from "@/domain/receivables/application/services/fetch-assignors-names";
import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { AssignorNamePresenter } from "../presenters/assignor-name-presenter";

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamsSchema>;

@Controller("/integrations/assignor")
export class FetchAssignorsNamesController {
  constructor(private fetchAssignorsNames: FetchAssignorsNamesService) {}

  @Get()
  async handle(@Query("page", queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchAssignorsNames.execute();

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return {
      assignorsNames: result.value.assignorsNames.map(
        AssignorNamePresenter.toHTTP
      ),
    };
  }
}
