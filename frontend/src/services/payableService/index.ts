import api from "../../api";
import { Payable } from "../../model/payable";

const PAYABLES_ENDPOINT = "/integrations/payable";

const payableService = {
  async createPayable(payable: Payable) {
    return api.post<Payable>(PAYABLES_ENDPOINT, payable);
  },
  async findAll() {
    return api.get<Payable[]>(PAYABLES_ENDPOINT);
  },
  async delete(id: string) {
    return api.delete(`${PAYABLES_ENDPOINT}/${id}`);
  },
  async findById(id: string) {
    return api.get<Payable>(`${PAYABLES_ENDPOINT}/${id}`);
  },
  async update(
    id: string,
    payable: Partial<Pick<Payable, "assignor" | "emissionDate" | "value">>
  ) {
    return api.put<Payable>(`${PAYABLES_ENDPOINT}/${id}`, payable);
  },
};

export default payableService;
