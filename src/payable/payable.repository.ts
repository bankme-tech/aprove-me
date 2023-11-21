import { Injectable } from "@nestjs/common";

@Injectable()
export class PayableRepository {
    private payables;

    constructor() {
        this.payables = [];
    }
    create(payable) {
        this.payables.push(payable);
        return payable;
    }
    findAll() {
        return this.payables;
    }
    find(id) {
        return this.payables.find(payable => payable.id === id);
    }
    update(id, payable) {
        const payableIndex = this.payables.findIndex(payable => payable.id === id);
        this.payables[payableIndex] = payable;
    }
    delete(id) {
        const payableIndex = this.payables.findIndex(payable => payable.id === id);
        this.payables.splice(payableIndex, 1);
    }
}