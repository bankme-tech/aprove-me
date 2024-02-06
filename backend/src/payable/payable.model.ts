export class Payable {
    constructor(
        public id: string,
        public value: number,
        public emissionDate: Date,
        public assignor: number
    ) { }
}