import { CreateAssignorInputDTO } from 'src/assignor/dto/create-assignor.input.dto';
import { AssignorEntity } from 'src/assignor/entities/assignor.entity';
import { IAssignorRepository } from 'src/assignor/repositories/assignor.repository.interface';
import { makeAssignorEntity } from '../entities/assignor.entity.mock';
import { UpdateAssignorInputDTO } from 'src/assignor/dto/update-assignor.input.dto';

export class AssignorRepositoryStub implements IAssignorRepository {
  public data: CreateAssignorInputDTO | string | UpdateAssignorInputDTO;
  public response: AssignorEntity = makeAssignorEntity();

  async save(
    createAssignorDTO: CreateAssignorInputDTO,
  ): Promise<AssignorEntity> {
    this.data = createAssignorDTO;
    return this.response;
  }

  async findAll(): Promise<AssignorEntity[]> {
    return [this.response];
  }

  async findById(id: string): Promise<AssignorEntity> {
    this.data = id;
    return this.response;
  }

  async update(assignor: UpdateAssignorInputDTO): Promise<AssignorEntity> {
    this.data = assignor;
    return this.response;
  }

  remove(id: string): Promise<void> {
    this.data = id;
    return Promise.resolve();
  }
}
