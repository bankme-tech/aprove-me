import { Injectable } from "@nestjs/common";

const fakeDb = []

@Injectable()
export class AssignorRepository {
    async create(data): Promise<any> {
        fakeDb.push(data)

        console.log('data', data)
        return data
    }

    async findOne(args): Promise<any> {
        return fakeDb.find(assignor => assignor.email === args.where.email)
    }
}