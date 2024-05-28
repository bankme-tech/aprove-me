import {
  CreateAssignorInputDTO,
  CreateAssignorOutputDTO,
  UpdateAssignorInputDTO,
} from "../dtos/assignor.dto";
import { Assignor } from "../entities/assignor.entity";

export interface IAssignorService {
  create(data: CreateAssignorInputDTO): Promise<CreateAssignorOutputDTO>;
  findById(id: string): Promise<CreateAssignorOutputDTO | null>;
  findAll(): Promise<CreateAssignorOutputDTO[]>;
  update(id: string, data: UpdateAssignorInputDTO): Promise<Assignor>;
  delete(id: string): Promise<void>;
}
