import { Assignor } from '@/app/entities/assignor';
import { AssignorRepository } from '@/app/repositories/assignor.repository';

export class InMemoryAssignorRepository implements AssignorRepository {
  public assignor: Assignor[] = [];

  public async create(assignor: Assignor): Promise<Assignor> {
    this.assignor.push(assignor);

    return assignor;
  }

  public async findAll(): Promise<Assignor[]> {
    return this.assignor;
  }

  public async findById(assignorId: string): Promise<Assignor> {
    return this.assignor.find((assignor) => assignor._id === assignorId);
  }

  public async findByEmail(assignorEmail: string): Promise<Assignor> {
    return this.assignor.find(
      (assignor) => assignor.props.email === assignorEmail,
    );
  }
  public async findByDocument(assignorDocument: string): Promise<Assignor> {
    return this.assignor.find(
      (assignor) => assignor.props.document === assignorDocument,
    );
  }
  public async edit(assignor: Assignor): Promise<Assignor> {
    const assignorIndex = this.assignor.findIndex(
      (item) => item._id === assignor._id,
    );

    if (assignorIndex >= 0) {
      this.assignor[assignorIndex] = assignor;

      return this.assignor[assignorIndex];
    }
  }

  public async delete(assignorId: string): Promise<void> {
    const assignorRemoved = this.assignor.filter(
      (pay) => pay._id !== assignorId,
    );

    this.assignor = assignorRemoved;
  }
}
