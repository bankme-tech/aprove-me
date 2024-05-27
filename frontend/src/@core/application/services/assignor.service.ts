import { inject, injectable } from "inversify";
import { TYPES } from "../../infra/dependecy-injection/types";
import { IAssignorService } from "@/@core/domain/services/assignor.service.interface";
import {
  CreateAssignorInputDTO,
  CreateAssignorOutputDTO,
} from "@/@core/domain/dtos/assignor.dto";
import { Assignor } from "@/@core/domain/entities/assignor.entity";
import type { IAssignorGateway } from "@/@core/domain/gateways/assignor.gateway";

@injectable()
export class AssignorService implements IAssignorService {
  constructor(
    @inject(TYPES.IAssignorGateway)
    private readonly assignorGateway: IAssignorGateway
  ) {}

  async create(data: CreateAssignorInputDTO): Promise<CreateAssignorOutputDTO> {
    return this.assignorGateway.create(data);
  }

  async findById(id: string): Promise<Assignor | null> {
    const result = await this.assignorGateway.findById(id);
    if (!result) {
      return null;
    }
    return result;
  }

  findAll(): Promise<Assignor[]> {
    return this.assignorGateway.findAll();
  }
}
