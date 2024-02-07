import { Assignor } from "@prisma/client";

export class Payable {
    constructor(
        public id: string,
        public value: number,
        public emissionDate: Date,
        public assignor: Assignor,
        public assignorId: string,
    ) { }
}