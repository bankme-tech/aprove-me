import { Controller, Get } from '@nestjs/common';
import { AssignorService } from './assignor.service';

@Controller()
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) { }

  @Get()
  getHello(): string {
    return this.assignorService.getHello();
  }
}
