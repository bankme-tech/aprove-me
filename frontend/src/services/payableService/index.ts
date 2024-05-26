import api from "../../api";
import { Payable } from "../../model/payable";

const PAYABLES_ENDPOINT = "/integrations/payable";

const payableService = {
  async createPayable(payable: Payable) {
    return api.post<Payable>(PAYABLES_ENDPOINT, payable);
  },
};

export default payableService;
