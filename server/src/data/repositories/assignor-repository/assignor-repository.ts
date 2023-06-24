import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infra/prisma/prisma.service";

const excludeKeys = (entity: any, keys: string[]) => {
  if(!entity) return entity
  keys.forEach((key) => {
    delete entity[key];
  });

  return entity;
};

@Injectable()
export class AssignorRepository {
    constructor (
        private readonly prisma: PrismaService
    ) {}

    async create(data): Promise<any> {
        const createdAssignor = await this.prisma.assignor.create({ data })
        const { password, ...assignor } = createdAssignor
        return excludeKeys(assignor, ['password'])
    }

    async findOne(args): Promise<any> {
        const assignor = await this.prisma.assignor.findFirst(args)
        return excludeKeys(assignor, ['password']);
    }

    async findOneByUsername(args): Promise<any> {
        return await this.prisma.assignor.findFirst(args)
    }

    async findAll(args): Promise<any[]> {
        const assignors = await this.prisma.assignor.findMany(args)
        return assignors.map((assignor) => {
            return excludeKeys(assignor, ['password']);
          }) as [any];
    }

    async update(id, data): Promise<any> {
        const assignor = await this.prisma.assignor.update({
            where: {
                id
            },
            data
        })
        
        return excludeKeys(assignor, ['password']);
    }

    async remove(id): Promise<any> {
        await this.prisma.assignor.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            }
        })
    }
}