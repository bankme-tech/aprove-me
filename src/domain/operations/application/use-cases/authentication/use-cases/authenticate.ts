import { Either, right, left } from "src/core/either"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"
import { AccountsRepository } from "../../../repositories/account-repository"
import { Account } from "src/domain/operations/enterprise/entities/accounts"
import { compare } from "bcryptjs"
import { JwtService } from "@nestjs/jwt"

interface AuthenticateAccountUseCaseRequest {
  login: string
  password: string
}

type AuthenticateAccountUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedException,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateAccountUseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private jwt: JwtService
  ) {}

  async execute({ login, password }: AuthenticateAccountUseCaseRequest): Promise<AuthenticateAccountUseCaseResponse> {
    const account = Account.create({
      login,
      password
    })

    const isAccountValid = await this.accountsRepository.findByLogin(login)

    if (!isAccountValid) {
      return left(new ResourceNotFoundError())
    }
    
    const isPasswordValid = await compare(password, isAccountValid.password)

    if (!isPasswordValid) {
      return left(new UnauthorizedException("Users credentials do not match."))
    }

    const accessToken = this.jwt.sign({ sub: isAccountValid.id })

    return right({ accessToken })
  }
}