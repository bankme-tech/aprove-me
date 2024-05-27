import { Payable, PayableData, PayableWithAssignor } from "../types/Payable";

export interface PayableGateway {
    getAllPayables(): Promise<Payable[]>;
    getPayable(id: string): Promise<PayableWithAssignor>;
    createPayable(payable: PayableData): Promise<void>;
    updatePayable(id: string, payable: PayableData): Promise<void>;
    deletePayable(id: string): Promise<void>;
}