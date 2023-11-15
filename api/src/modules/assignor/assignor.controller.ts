import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateAssignorDTO } from './dto/create-assignor.dto';
import { IAssignor } from './interfaces/assignor.interface';
import { AssignorService } from './assignor.service';
import { IAssignorService } from './interfaces/assignor-service.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('integrations/assignor')
export class AssignorController {
  constructor(
    @Inject(AssignorService) private readonly assignorService: IAssignorService,
  ) {}

  @Post()
  create(@Body() assignor: CreateAssignorDTO): Promise<IAssignor> {
    return this.assignorService.create(assignor);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() assignor: Partial<IAssignor>,
  ): Promise<IAssignor> {
    return this.assignorService.update(id, assignor);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.assignorService.delete(id);
  }

  @Get()
  findAll(): Promise<IAssignor[]> {
    return this.assignorService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<IAssignor> {
    return this.assignorService.findById(id);
  }
}
