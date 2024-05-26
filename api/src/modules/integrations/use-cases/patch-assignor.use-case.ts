import { IUseCase } from '@/core/use-cases/interfaces';
import { Injectable } from '@nestjs/common';
import { FindAssignorByIdUseCase } from './find-assignor-by-id.use-case';
import { AssignorsRepository } from '../domain/repositories/assignors.repository';
import { Assignor } from '../domain/entities/assignor.entity';
import { PatchAssignorDto } from '../infra/http/dtos/patch-assignor.dto';

@Injectable()
export class PatchAssignorUseCase implements IUseCase {
  constructor(
    private assignorsRepository: AssignorsRepository,
    private findAssignorByIdUseCase: FindAssignorByIdUseCase,
  ) {}

  public async execute(patch: {
    id: string;
    patchAssignorDto: PatchAssignorDto;
  }) {
    await this.findAssignorByIdUseCase.execute(patch.id);

    const assignor = new Assignor({
      id: patch.id,
      document: patch.patchAssignorDto.document,
      email: patch.patchAssignorDto.email,
      phone: patch.patchAssignorDto.phone,
      name: patch.patchAssignorDto.name,
    });

    const updatePayable = await this.assignorsRepository.update(assignor);

    return updatePayable;
  }
}
