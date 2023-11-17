import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { mock } from 'jest-mock-extended';
import { IUserRepository } from '../interface/users-repository.interface';
import { UsersRepository } from '../../../infra/database/repositories/users.repository';

describe('UsersService', () => {
  let service: UsersService;
  const userRepositoryMock = mock<IUserRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: userRepositoryMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findByUsername()', () => {
    it('should call UsersService with success and correct params', () => {
      // ACT
      service.findByUsername('username');

      // ASSERT
      expect(userRepositoryMock.findByUsername).toHaveBeenCalledWith(
        'username',
      );
    });
  });
});
