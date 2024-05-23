import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { env } from '@/environments'
import { AuthSchema } from './dto/sign-in-auth.dto'
import { Auth } from './entities/auth.entity'
import { AuthRepository } from './repository/auth.repository'
import { AuthPresenter } from './repository/presenters/auth.presenter'

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private repo: AuthRepository,
  ) {}

  async signIn({ login, password }: AuthSchema) {
    const auth = await this.repo.findByLogin(login)

    if (!auth) {
      throw new NotFoundException('User or Password invalid')
    }

    const isPasswordValid = await auth.comparePassword(password)

    if (!isPasswordValid) {
      throw new UnauthorizedException()
    }

    return this.responseWithJWT(auth)
  }

  async signUp({ login, password }: AuthSchema) {
    const authExists = await this.repo.findByLogin(login)
    if (authExists) {
      throw new ConflictException('Login already exists.')
    }

    const auth = Auth.create({
      login,
      password,
    })

    await auth.hasPassword()
    await this.repo.create(auth)
    return this.responseWithJWT(auth)
  }

  private responseWithJWT(auth: Auth) {
    const token = this.jwt.sign(
      { login: auth.login },
      {
        expiresIn: '7d',
        subject: `${auth.id}`,
        issuer: 'aprove-me-api',
        audience: 'auth-user',
        secret: env.JWT_SECRET,
      },
    )

    return {
      user: AuthPresenter.toResponseHttp(auth),
      token: {
        type: 'Bearer',
        access_token: token,
      },
    }
  }
}
