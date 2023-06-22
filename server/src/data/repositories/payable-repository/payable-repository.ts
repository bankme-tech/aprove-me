import { Injectable } from "@nestjs/common";

const fakeDb = []

@Injectable()
export class PayableRepository {
    async create(data): Promise<any> {
        fakeDb.push(data)
        return data
    }

    async findOne(args): Promise<any> {
        return fakeDb.find(payable => payable.id === args.where.id)
    }
}