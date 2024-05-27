import {
  CreateAssignorInputDTO,
  CreateAssignorOutputDTO,
} from "../dtos/assignor.dto";

export interface IAssignorService {
  create(data: CreateAssignorInputDTO): Promise<CreateAssignorOutputDTO>;
  findById(id: string): Promise<CreateAssignorOutputDTO | null>;
  findAll(): Promise<CreateAssignorOutputDTO[]>;
}
