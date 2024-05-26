import api from "../../api";
import { Assignor } from "../../model/assignor";

const ASSIGNOR_ENDPOINT = "/integrations/assignor";

const assignorService = {
  async findAll() {
    return api.get<Assignor[]>(ASSIGNOR_ENDPOINT);
  },
  async create(assignor: Assignor) {
    return api.post<Assignor>(ASSIGNOR_ENDPOINT, assignor);
  },
};

export default assignorService;
