import { Injectable } from '@nestjs/common'
import { AssignorCreateSchema } from './dto/create.assignor'
import { Assignor } from './entities/assignor.entity'
import { AssignorRepository } from './repository/assignor.repository'

@Injectable()
export class AssignorsService {
  constructor(private repo: AssignorRepository) {}

  async create(data: AssignorCreateSchema) {
    const assignor = Assignor.create({
      document: data.document,
      email: data.email,
      name: data.name,
      phone: data.phone,
    })
    await this.repo.create(assignor)
    return assignor
  }

  findOne(id: string) {
    const assignor = this.repo.findById(id)
    return assignor
  }
}
