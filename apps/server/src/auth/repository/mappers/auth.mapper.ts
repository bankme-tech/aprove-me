import { Auth } from '@/auth/entities/auth.entity'
import { Prisma, Auth as PrismaAuth } from '@prisma/client'

export class PrismaAuthMapper {
  static toDomain(raw: PrismaAuth): Auth {
    return Auth.create(
      {
        login: raw.login,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }

  static toPrisma(auth: Auth): Prisma.AuthUncheckedCreateInput {
    return {
      id: auth.id,
      login: auth.login,
      password: auth.password,
      createdAt: auth.createdAt,
      updatedAt: auth.updatedAt,
    }
  }
}
