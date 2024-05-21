import { api } from "@/lib/api";
import { AssignorTypes } from "@/types/assignor";

export class AssignorService {
  static async create(createAssignorData: AssignorTypes) {
    await api.post("/integrations/assignor", createAssignorData);
  }
}
