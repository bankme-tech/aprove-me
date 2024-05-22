import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { z } from "zod";
import { GetReceivableUseCase } from "src/domain/operations/application/use-cases/recivables/use-cases/get-receivable";

const getPayableBodySchema = z.string().uuid()

type GetPayableBodySchema = z.infer<typeof getPayableBodySchema>

@Controller('/integrations/payable')
export class GetPayableController {
  constructor(
    private getReceivable: GetReceivableUseCase
  ) {}

  @Get('/:id')
  @HttpCode(200)
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