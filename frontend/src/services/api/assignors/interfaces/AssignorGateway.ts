import { Assignor } from "../types/Assignor";

export type AssignorData = Omit<Assignor, 'id'>

export interface AssignorGateway {
    getAllAssignors(): Promise<Assignor[]>;
    getAssignor(id: string): Promise<Assignor>;
    createAssignor(assignor: AssignorData): Promise<void>;
    updateAssignor(id: string, assignor: AssignorData): Promise<void>;
    deleteAssignor(id: string): Promise<void>;
}