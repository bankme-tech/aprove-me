import { TestingModule, Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersRepository } from '../users.repository';
import { PrismaServiceMock } from './mock/prisma-service.mock';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        { provide: PrismaService, useClass: PrismaServiceMock },
      ],
    }).compile();

    prismaServiceMock = module.get<PrismaService>(PrismaService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  describe('findByUsername', () => {
    it('should call PrismaService with success and correct params', async () => {
      // ACT
      await repository.findByUsername('any username');

      // ASSERT
      expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
        where: { username: 'any username' },
      });
    });
  });
});
