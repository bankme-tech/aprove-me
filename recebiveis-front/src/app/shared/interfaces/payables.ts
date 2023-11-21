export interface Payable {
    id:string;
    value : string;
    emissionDate: Date;
    assignorId : string;
}

export interface Assignor {
    id: any;
    document : string;
    name: string;
    phone: string;
    email: string;
}

export interface PayableRequest{
    payable : Payable,
    assaignedTo?: Assignor
}

export interface Credentials {
    login: string | null;
    password: string | null;
}