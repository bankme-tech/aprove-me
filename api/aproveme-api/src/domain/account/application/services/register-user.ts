import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { HashGenerator } from "../cryptography/hash-generator";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "../../enterprise/entities/user";
import { UsersRepository } from "../repositories/users-repository";

interface RegisterUserServiceRequest {
  login: string;
  password: string;
}

type RegisterUserServiceResponse = Either<
  UserAlreadyExistsError,
  {
    user: User;
  }
>;

@Injectable()
export class RegisterUserService {
  constructor(
    private usersRepo: UsersRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    login,
    password,
  }: RegisterUserServiceRequest): Promise<RegisterUserServiceResponse> {
    const userWithSameLogin = await this.usersRepo.findByLogin(login);

    if (userWithSameLogin) {
      return left(new UserAlreadyExistsError(login));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      login,
      password: hashedPassword,
    });

    await this.usersRepo.create(user);

    return right({
      user,
    });
  }
}
