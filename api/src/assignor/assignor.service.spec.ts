import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../db/prisma.service';
import { Assignor } from './entities/assignor.entity';

const assignorEntityList = [
  new Assignor(
    '1',
    '12345678901',
    'teste@teste.com',
    '31999999999',
    'Assignor 1',
  ),
  new Assignor(
    '2',
    '98765432109',
    'teste2@teste.com',
    '31999999998',
    'Assignor 2',
  ),
];

describe('AssignorService', () => {
  let assignorService: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorService,
        {
          provide: PrismaService,
          useValue: {
            assignor: {
              findMany: jest.fn().mockResolvedValue(assignorEntityList),
              create: jest.fn().mockResolvedValue(assignorEntityList[0]),
              findUniqueOrThrow: jest
                .fn()
                .mockResolvedValue(assignorEntityList[1]),
              update: jest.fn().mockResolvedValue(assignorEntityList[1]),
              delete: jest.fn().mockResolvedValue({}),
            },
          },
        },
      ],
    }).compile();

    assignorService = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(assignorService).toBeDefined();
  });
});
