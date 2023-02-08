import { Controller } from '@nestjs/common';
import { ReceivableService } from './receivable.service';

@Controller('receivable')
export class ReceivableController {
  constructor(private readonly receivableService: ReceivableService) {}
}
