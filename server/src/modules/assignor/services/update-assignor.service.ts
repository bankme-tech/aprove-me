import { UpdateAssignorDto } from '@infra/http/assignor/dtos/update-assignor.dto';
import { AssignorRepository } from '../repositories/assignor.repository';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@utils/either';

type UpdateAssignorServiceResponse = Either<Error, UpdateAssignorDto>;

@Injectable()
export class UpdateAssignorService {
  constructor(private repository: AssignorRepository) {}

  async execute(
    id: string,
    { document, name, phone, email }: UpdateAssignorDto,
  ): Promise<UpdateAssignorServiceResponse> {
    const assignor = await this.repository.findById(id);

    if (!assignor) {
      return left(new Error('Assignor not found'));
    }

    assignor.document = document ?? assignor.document;
    assignor.name = name ?? assignor.name;
    assignor.phone = phone ?? assignor.phone;
    assignor.email = email ?? assignor.email;

    await this.repository.save(assignor);

    return right(assignor);
  }
}
