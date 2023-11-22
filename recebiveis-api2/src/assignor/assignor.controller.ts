import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { UUID } from 'crypto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AssignorEntity } from './assignor.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('assignor')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('integrations/assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post()
  @ApiCreatedResponse({ type: AssignorEntity })
  create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  @Get()
  @ApiOkResponse({ type: AssignorEntity, isArray: true })
  findAll() {
    return this.assignorService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AssignorEntity })
  findOne(@Param('id') id: UUID) {
    return this.assignorService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: AssignorEntity })
  update(@Param('id') id: UUID, @Body() updateAssignorDto: UpdateAssignorDto) {
    return this.assignorService.update(id, updateAssignorDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: UUID) {
    return this.assignorService.remove(id);
  }
}
