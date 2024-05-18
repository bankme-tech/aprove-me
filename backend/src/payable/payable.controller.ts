import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreatePayableDto } from './payable.dto';

@Controller('payable')
export class PayableController {
    @Post()
    async createPayable(@Body() payableDto : CreatePayableDto) {
        try {
            return await {
                status: "OK",
                payableDto
            }
        } catch(err) {
            throw new BadRequestException(err.message)
        }
    }

}
