import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReceivableService } from './receivable.service';
import { ReceivableDTO } from '../../dtos/receivable.dto';

@Controller('integrations')
export class ReceivableController {
  constructor(private readonly receivableService: ReceivableService) {}

  @Post('payable/:assignorID')
  async create(@Param('assignorID') assignorID: string, @Body() data: ReceivableDTO) {
    return this.receivableService.create(assignorID, data);
  }
}
