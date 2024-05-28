import { CreateAssignorInputDTO } from "../dtos/assignor.dto";
import { Assignor } from "../entities/assignor.entity";

export interface IAssignorGateway {
  create(params: CreateAssignorInputDTO): Promise<Assignor>;
  findById(id: string): Promise<Assignor | null>;
  findAll(): Promise<Assignor[]>;
  update(id: string, params: CreateAssignorInputDTO): Promise<Assignor>;
  delete(id: string): Promise<void>;
}
