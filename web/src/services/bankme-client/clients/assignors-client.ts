import type { CreateAssignorSchema } from '@/schemas/assignors/create-assignor-schema';
import type { AssignorModel } from '@/services/models/assignor-model';

export abstract class AssignorsClient {
  public abstract findAll(): Promise<{ assignors: AssignorModel[] }>;

  public abstract update(update: {
    id: string;
    partialCreateAssignor: Partial<CreateAssignorSchema>;
  }): Promise<AssignorModel>;

  public abstract create(
    createAssignorSchema: CreateAssignorSchema,
  ): Promise<AssignorModel>;

  public abstract delete(id: string): Promise<void>;

  public abstract find(id: string): Promise<AssignorModel>;
}
