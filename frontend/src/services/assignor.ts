import { api } from "@/lib/api";
import {
  Assignor,
  AssignorTypes,
  getAllAssignorResponse,
} from "@/types/assignor";

export class AssignorService {
  static async create(createAssignorData: AssignorTypes) {
    await api.post("/integrations/assignor", createAssignorData);
  }

  static async getAll(): Promise<getAllAssignorResponse> {
    const { data } = await api.get<getAllAssignorResponse>(
      "/integrations/assignor",
    );

    return data;
  }

  static async findById(assignorId: string): Promise<Assignor | null> {
    const { data } = await api.get<Assignor>(
      `/integrations/assignor/${assignorId}`,
    );

    return data;
  }
}
