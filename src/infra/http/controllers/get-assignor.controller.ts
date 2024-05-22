import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { z } from "zod";
import { GetAssignorUseCase } from "src/domain/operations/application/use-cases/assignors/use-cases/get-assignor";
import { JwtAuthGuard } from "src/infra/auth/jwt-auth.guard";
import { CurrentUser } from "src/infra/auth/current-user-decorator";
import { UserPayload } from "src/infra/auth/jwt.strategy";

const getAssignorBodySchema = z.string().uuid()
type GetAssignorBodySchema = z.infer<typeof getAssignorBodySchema>

@Controller('/integrations/assignor')
export class GetAssignorController {
  constructor(
    private getReceivable: GetAssignorUseCase
  ) {}

  @Get('/:id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async handle(@CurrentUser() user: UserPayload, @Param('id') id: GetAssignorBodySchema) {
    const { value: receivable, isLeft } = await this.getReceivable.execute({
      assignorId: id
    })
    
    if (isLeft()) {
      return {
        message: 'Resource not found'
      }
    }

    return receivable
  }
}