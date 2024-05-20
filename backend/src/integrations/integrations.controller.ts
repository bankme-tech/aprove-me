import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import {
  CreateAssignorDto,
  CreateReceivableDto,
} from './dto/create-integration.dto';
import { validateDto } from 'src/utils';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post('/payable')
  async create(@Body() dataDto: CreateReceivableDto | CreateAssignorDto) {
    let validatedData;
    try {
      if (
        dataDto.hasOwnProperty('value') &&
        dataDto.hasOwnProperty('emissionDate')
      ) {
        validatedData = await validateDto(dataDto, CreateReceivableDto);
      } else if (
        dataDto.hasOwnProperty('document') &&
        dataDto.hasOwnProperty('email')
      ) {
        validatedData = await validateDto(dataDto, CreateAssignorDto);
      } else {
        throw new BadRequestException('Invalid data format');
      }
    } catch (error) {
      let message = error.message;

      try {
        message = JSON.parse(error.message);
      } catch (_err) {}

      throw new BadRequestException(message);
    }

    return this.integrationsService.create(validatedData);
  }
}
