import { api } from "../apiService";
import { PayableGateway } from "./interfaces/PayableGateway";
import { Payable, PayableData, PayableWithAssignor } from "./types/Payable";

export class APIPayableService implements PayableGateway {
    async getAllPayables(): Promise<Payable[]> {
        const response = await api.get("/payables");
        return response.data;
    }

    async getPayable(id: string): Promise<PayableWithAssignor> {
        const response = await api.get(`/payables/${id}`);
        return response.data;
    }

    async createPayable(payable: PayableData): Promise<void> {
        return await api.post("/payables", payable);
    }

    async updatePayable(id: string, payable: PayableData): Promise<void> {
        return await api.patch(`/payables/${id}`, payable);
    }

    async deletePayable(id: string): Promise<void> {
        return await api.delete(`/payables/${id}`);
    }
}