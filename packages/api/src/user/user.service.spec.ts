import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './repositories/user-repository';
import { NotFoundException } from '@nestjs/common';

export const userMock = new User('1', 'john', '123456');

export class UserRepositoryMock implements UserRepository {
  async findByLogin() {
    return userMock;
  }

  async create() {
    return userMock;
  }
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeInstanceOf(UserService);
  });

  it('should create an user and return it', async () => {
    const assignor = await service.create(userMock);

    expect(assignor).toEqual(userMock);
    expect(assignor).toBeInstanceOf(User);
  });

  it('should find an user by login', async () => {
    const assignor = await service.findByLogin('john');

    expect(assignor).toEqual(userMock);
  });

  it('should throw if user is not found', async () => {
    jest.spyOn(UserRepositoryMock.prototype, 'findByLogin').mockResolvedValue(undefined);

    try {
      const user = await service.findByLogin('1');
      expect(user).toBeDefined();
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.status).toBe(404);
      expect(error.message).toBe('user not found');
    }
  });
});
