import { Assignor } from '@/assignors/entities/assignor.entity'

export class AssignorPresenter {
  static toResponseHttp(assignor: Assignor) {
    return {
      id: assignor.id,
      document: assignor.document,
      email: assignor.email,
      name: assignor.name,
      phone: assignor.phone,
      createdAt: assignor.createdAt,
      updatedAt: assignor.updatedAt,
    }
  }
}
