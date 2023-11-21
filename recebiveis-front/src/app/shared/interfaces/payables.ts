export interface Payables {
    value : string;
    emissionDate: Date;
    assagnorId : string
}

export interface Assagnor {
    id: any;
    document : string;
    name: string;
    phone: string;
    email: string;
}

export interface PayableRequest{
    payable : Payables,
    assaignedTo?: Assagnor
}

export interface Credentials {
    login: string | null;
    password: string | null;
}