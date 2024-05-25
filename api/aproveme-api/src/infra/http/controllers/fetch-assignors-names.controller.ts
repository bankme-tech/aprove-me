import { FetchAssignorsNamesService } from "@/domain/receivables/application/services/fetch-assignors-names";
import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { AssignorNamePresenter } from "../presenters/assignor-name-presenter";

@Controller("/integrations/assignor")
export class FetchAssignorsNamesController {
  constructor(private fetchAssignorsNames: FetchAssignorsNamesService) {}

  @Get()
  async handle() {
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
