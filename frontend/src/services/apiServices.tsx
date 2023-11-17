import { AssignorData } from "../types/AssignorData";
import { PayableData } from "../types/PayableData";
import api from "./api";

export const createPayable = async (payableData: { value: string; emissionDate: string }) => {
  try {
    const response = await api.post<PayableData>("/integrations/payable", payableData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAssignor = async (assignorData: { document: string; email: string; phone: string; name: string }) => {
  try {
    const response = await api.post<AssignorData>("/integrations/assignor", assignorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
