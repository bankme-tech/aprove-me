import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { FetchPaginatedPayablesService } from "@/domain/receivables/application/services/fetch-paginated-payables";
import { PayablePresenter } from "../presenters/payable-presenter";

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1));
const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema);
type PageQueryParamSchema = z.infer<typeof pageQueryParamsSchema>;

@Controller("/integrations/payable")
export class FetchPayablesController {
  constructor(private fetchPayablesService: FetchPaginatedPayablesService) {}

  @Get()
  async handle(@Query("page", queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchPayablesService.execute({ page });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return {
      payables: result.value.payables.map(PayablePresenter.toHTTP),
    };
  }
}
