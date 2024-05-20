import { Injectable } from '@nestjs/common';
import {
  CreateAssignorDto,
  CreateReceivableDto,
} from './dto/create-integration.dto';

@Injectable()
export class IntegrationsService {
  create(createDto: CreateReceivableDto | CreateAssignorDto) {
    return createDto;
  }
}
