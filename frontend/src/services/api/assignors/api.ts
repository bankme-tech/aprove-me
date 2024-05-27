import { api } from "../apiService";
import { AssignorData, AssignorGateway } from "./interfaces/AssignorGateway";
import { Assignor } from "./types/Assignor";

export class APIAssignorService implements AssignorGateway {
    async getAllAssignors(): Promise<Assignor[]> {
        const response = await api.get("/assignors");
        return response.data;
    }

    async getAssignor(id: string): Promise<Assignor> {
        const response = await api.get(`/assignors/${id}`);
        return response.data;
    }

    async createAssignor(assignor: AssignorData): Promise<void> {
        return await api.post("/assignors", assignor);
    }

    async updateAssignor(id: string, assignor: AssignorData): Promise<void> {
        return await api.put(`/assignors/${id}`, assignor);
    }
    
    async deleteAssignor(id: string): Promise<void> {
        return await api.delete(`/assignors/${id}`);
    }
}