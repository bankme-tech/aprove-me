import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { PayableService } from './payables.service';
import { PayableDto } from './dto/create-payable';
import { Response, Request } from 'express';
import * as helpers from '../shared/helpers';

@Controller('integrations')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post('payable')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payableDto: PayableDto, @Res() res: Response, @Req() req: Request): Promise<Response> {
    const { value, emissionDate, assignor } = req.body;

    if (helpers.isEmptyOrNull(value) ||
      helpers.isEmptyOrNull(emissionDate) ||
      helpers.isEmptyOrNull(assignor)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid Request. Param is missing.'
      });
    }

    if (!helpers.isValidDate(emissionDate)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        status: HttpStatus.BAD_REQUEST,
        message: `Invalid Request. Param ${emissionDate} is invalid.`
      });
    }

    try {
      const payable = await this.payableService.create(payableDto);

      return res.status(HttpStatus.CREATED).json({
        data: [payable],
        status: HttpStatus.CREATED,
        message: 'Successfully created'
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while creating the payable'
      });
    }
  }
}