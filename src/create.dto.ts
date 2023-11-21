export class CreatePayableDto {
    id: string;
    value: number;
    emissionDate: Date;
    assignor: Assignor;
}
export class Assignor {
    document: string;
    email: string;
    phone: string;
    name: string;
}