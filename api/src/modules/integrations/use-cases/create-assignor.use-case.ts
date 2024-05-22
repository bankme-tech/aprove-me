import { IUseCase } from '@/core/use-cases/interfaces';

import { Injectable } from '@nestjs/common';
import { AssignorsRepository } from '../domain/repositories/assignors.repository';
import { CreateAssignorDto } from '../infra/http/dtos/create-assignor.dto';
import { Assignor } from '../domain/entities/assignor.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CreateAssignorUseCase implements IUseCase {
  constructor(
    private assignorsRepository: AssignorsRepository,
    private configService: ConfigService,
  ) {}

  public async execute(createAssignorDto: CreateAssignorDto) {
    const encryptedPassword = await bcrypt.hash(
      createAssignorDto.password,
      this.configService.get('cryptRounds') as number,
    );

    const payable = new Assignor({
      document: createAssignorDto.document,
      email: createAssignorDto.email,
      phone: createAssignorDto.phone,
      name: createAssignorDto.name,
      password: encryptedPassword,
    });

    const createdPayable = await this.assignorsRepository.save(payable);

    return createdPayable;
  }
}
