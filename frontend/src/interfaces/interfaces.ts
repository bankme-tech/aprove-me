
export interface Payable {
    id: string;
    value: number;
    emissionDate: string;
    assignorId: string;
}

export interface Assignor {
    id: string;
    document: string;
    email: string;
    phone: string;
    name: string;
}