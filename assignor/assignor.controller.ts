import { Controller } from '@nestjs/common';
import { AssignorService } from './assignor.service';

@Controller('assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}
}
