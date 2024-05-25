import { AssignorDto } from '../../DTOs/assignor';

export abstract class AssignorRepo {
  abstract createAssignor(body: AssignorDto): Promise<AssignorDto>;
  abstract getAssignorById(id: string): Promise<AssignorDto>;
  abstract getAllAssignors(): Promise<AssignorDto[]>;
  abstract updateAssignor(id: string, body: AssignorDto): Promise<AssignorDto>;
  abstract deleteAssignor(id: string): Promise<void>;
}
