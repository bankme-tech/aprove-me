import { Payable } from "@prisma/client";

export class Assignor {
    constructor(
        public id: number,
        public document: string,
        public email: string,
        public phone: string,
        public name: string,
        public payable: Payable[]
    ) { }
}