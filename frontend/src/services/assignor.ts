import { api } from "@/lib/api";
import { AssignorTypes, getAllAssignorResponse } from "@/types/assignor";

export class AssignorService {
  static async create(createAssignorData: AssignorTypes) {
    await api.post("/integrations/assignor", createAssignorData);
  }

  static async getAll() {
    const { data } = await api.get<getAllAssignorResponse>(
      "/integrations/assignor",
    );

    return data;
  }
}
