import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Either, left, right } from '@utils/either';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exeception';
import { User } from '../entities/user.entity';

type CreateUserResponse = Either<UserAlreadyExistsException, User>;

@Injectable()
export class CreateUserService {
  constructor(private repository: UserRepository) {}

  async execute(user: User): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.repository.findByLogin(user.login);

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsException());
    }

    const entity = User.create(user);

    await this.repository.create(user);

    return right(entity);
  }
}
