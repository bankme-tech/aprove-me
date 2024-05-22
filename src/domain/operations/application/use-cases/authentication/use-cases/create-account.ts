import { Either, right, left } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"
import { AccountsRepository } from "../../../repositories/account-repository"
import { Account } from "src/domain/operations/enterprise/entities/accounts"

interface CreateAccountUseCaseRequest {
  login: string
  password: string
}

type CreateAccountUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    account: Account
  }
>

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private accountsRepository: AccountsRepository
  ) {}

  async execute({ login, password }: CreateAccountUseCaseRequest): Promise<CreateAccountUseCaseResponse> {
    const account = Account.create({
      login,
      password
    })

    await this.accountsRepository.create(account)

    return right({ account })
  }
}