import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RegisterAssignorRequestSchema } from './request.schema';
import { RegisterAssignorService } from '../../services/register-assignor/register-assignor.service';
import { InvalidEntityEntry } from '~/common/exceptions/invalid-entity-entry.exception';
import { AuthGuard } from '~/modules/auth/guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterAssignorResponseSchema } from './response.schema';
import { plainToInstance } from 'class-transformer';
import { ConflictResource } from '~/common/exceptions/conflict-resource.exception';

@ApiTags('Assignor')
@ApiBearerAuth()
@Controller('integrations/assignor')
export class RegisterAssignorController {
  constructor(private service: RegisterAssignorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Assignor registered.',
    type: RegisterAssignorResponseSchema,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async handle(
    @Body() data: RegisterAssignorRequestSchema,
  ): Promise<RegisterAssignorResponseSchema> {
    const result = await this.service.execute(data);

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case ConflictResource:
          throw new HttpException(result.value.message, HttpStatus.CONFLICT);

        case InvalidEntityEntry:
        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
      }
    }

    return plainToInstance(RegisterAssignorResponseSchema, result.value);
  }
}
