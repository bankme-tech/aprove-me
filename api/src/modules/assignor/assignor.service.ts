import { Injectable } from '@nestjs/common';
import { IAssignorService } from './interfaces/assignor-service.interface';
import { CreateAssignorDTO } from './dto/create-assignor.dto';
import { IAssignor } from './interfaces/assignor.interface';

@Injectable()
export class AssignorService implements IAssignorService {
  async create(assignor: CreateAssignorDTO): Promise<IAssignor> {
    return { ...assignor, id: 123 };
  }
}
