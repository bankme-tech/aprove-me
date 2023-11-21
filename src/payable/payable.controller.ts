import { Controller, Post, Body } from "@nestjs/common";
import { PayableRepository } from "./payable.repository";


@Controller('/integrations/payable')
export class PayableController {
    constructor(private payableRepository: PayableRepository) { }

    @Post()
    async create(@Body() payable: any) {
        return this.payableRepository.create(payable);
    }
}