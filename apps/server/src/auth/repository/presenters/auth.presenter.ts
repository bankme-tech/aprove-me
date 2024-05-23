import { Auth } from '@/auth/entities/auth.entity'

export class AuthPresenter {
  static toResponseHttp(auth: Auth) {
    return {
      id: auth.id,
      login: auth.login,
      createdAt: auth.createdAt,
      updatedAt: auth.updatedAt,
    }
  }
}
