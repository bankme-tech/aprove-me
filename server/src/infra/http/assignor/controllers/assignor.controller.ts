import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAssignorDto } from '../dtos/create-assignor.dto';
import { UpdateAssignorService } from './../../../../modules/assignor/services/update-assignor.service';
import { CreateAssignorService } from '@modules/assignor/services/create-assignor.service';
import { ReadAssignorService } from '@modules/assignor/services/read-assignor.service';
import { DeleteAssignorService } from '@modules/assignor/services/delete-assignor.service';
import { JwtAuthGuard } from '@infra/authentication/guards/jwt-auth.guard';
import { ReadAllAssignorService } from '@modules/assignor/services/read-all-assignor.service';
import { HttpAssignorMapper } from '../mappers/http-assignor.mapper';
import { Assignor } from '@modules/assignor/entities/assignor.entity';

@Controller('integrations/assignor')
@ApiTags('Assignor')
@UseGuards(JwtAuthGuard)
export class AssignorController {
  constructor(
    private createAssignorService: CreateAssignorService,
    private readAssignorService: ReadAssignorService,
    private readAllAssignorService: ReadAllAssignorService,
    private updateAssignorService: UpdateAssignorService,
    private deleteAssignorService: DeleteAssignorService,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Assignor created.' })
  async create(@Body() body: CreateAssignorDto): Promise<any> {
    const result = await this.createAssignorService.execute(body);

    if (result.isLeft()) {
      return result.value;
    }

    return HttpAssignorMapper.toHttp(result.value as Assignor);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Assignor found.' })
  @ApiResponse({ status: 404, description: 'Assignor not found.' })
  async findById(@Param('id') id: string) {
    const result = await this.readAssignorService.execute(id);

    if (result.isLeft()) {
      return result.value;
    }

    return HttpAssignorMapper.toHttp(result.value as Assignor);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Assignors found.' })
  @ApiResponse({ status: 404, description: 'Assignors not found.' })
  async findAll() {
    const result = await this.readAllAssignorService.execute();

    if (result.isLeft()) {
      return result.value;
    }

    return result.value.map((assignor) =>
      HttpAssignorMapper.toHttp(assignor as Assignor),
    );
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Assignor deleted.' })
  @ApiResponse({ status: 404, description: 'Assignor not found.' })
  async delete(@Param('id') id: string) {
    const result = await this.deleteAssignorService.execute(id);

    if (result.isLeft()) {
      return result.value;
    }

    return result.value;
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Assignor updated.' })
  @ApiResponse({ status: 404, description: 'Assignor not found.' })
  async update(@Param('id') id: string, @Body() body: CreateAssignorDto) {
    const result = await this.updateAssignorService.execute(id, body);

    if (result.isLeft()) {
      return result.value;
    }

    return result.value;
  }
}
