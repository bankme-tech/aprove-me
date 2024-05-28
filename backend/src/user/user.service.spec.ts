import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryDatabase } from 'src/infra/database/inMemory';
import { getUsersSeed } from 'src/infra/database/inMemory/seed';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserService } from './user.service';

const now = new Date();

describe('UserService', () => {
  let service: UserService;
  let databaseService: { user: InMemoryDatabase };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: new InMemoryDatabase({ date: now }),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    databaseService = module.get<{ user: InMemoryDatabase }>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return undefined when provided login is not found', async () => {
      const result = await service.findOne('johndoe');

      expect(result).toBeUndefined();
    });

    it('should get an user by login', async () => {
      const userList = getUsersSeed({ date: now });
      databaseService.user.seed(userList);

      const result = await service.findOne('aprovame');

      expect(result).toEqual(userList[0]);
    });
  });
});
