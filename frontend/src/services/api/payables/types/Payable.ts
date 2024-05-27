import { Assignor } from "../../assignors/types/Assignor";

export type Payable = {
    id: string;
    value: number;
    emissionDate: Date;
    assignor: string;
}

export type PayableData = Omit<Payable, 'id'>

export type PayableWithAssignor = Payable & {
    assignorReference: Assignor;
}