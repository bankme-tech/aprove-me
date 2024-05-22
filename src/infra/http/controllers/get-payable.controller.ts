import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { z } from "zod";
import { GetReceivableUseCase } from "src/domain/operations/application/use-cases/recivables/use-cases/get-receivable";
import { JwtAuthGuard } from "src/infra/auth/jwt-auth.guard";

const getPayableBodySchema = z.string().uuid()

type GetPayableBodySchema = z.infer<typeof getPayableBodySchema>

@Controller('/integrations/payable')
export class GetPayableController {
  constructor(
    private getReceivable: GetReceivableUseCase
  ) {}

  @Get('/:id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async handle(@Param('id') id: GetPayableBodySchema) {
    const { value: receivable, isLeft } = await this.getReceivable.execute({
      receivableId: id
    })
    
    if (isLeft()) {
      return {
        message: 'Resource not found'
      }
    }

    return receivable
  }
}