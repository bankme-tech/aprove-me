import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryDatabase } from 'src/infra/database/inMemory/';
import { getAssignorSeed } from 'src/infra/database/inMemory/seed';
import { PrismaService } from 'src/infra/database/prisma.service';
import { AssignorService } from './assignor.service';

const now = new Date();

describe('AssignorService', () => {
  let service: AssignorService;
  let databaseService: { assignor: InMemoryDatabase };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorService,
        {
          provide: PrismaService,
          useValue: {
            assignor: new InMemoryDatabase({ date: now }),
          },
        },
      ],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
    databaseService = module.get<{ assignor: InMemoryDatabase }>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new assignor', async () => {
      const result = await service.create({
        name: 'John Doe',
        document: '12.345.678/0001-00',
        email: 'john.doe@email.com',
        phone: '+55 (79) 99999-9999',
      });

      expect(result).toEqual({
        id: '1',
        name: 'John Doe',
        document: '12345678000100',
        email: 'john.doe@email.com',
        phone: '5579999999999',
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      });
    });
  });

  describe('findAll', () => {
    it('should list all assignor', async () => {
      const assignorList = getAssignorSeed({ date: now });
      databaseService.assignor.seed(assignorList);

      const result = await service.findAll();

      expect(result).toEqual(assignorList);
    });
  });

  describe('findOne', () => {
    it('should return undefined when provided id is not found', async () => {
      const result = await service.findOne('1');

      expect(result).toBeUndefined();
    });

    it('should get an assignor by id', async () => {
      const assignorList = getAssignorSeed({ date: now });
      databaseService.assignor.seed(assignorList);

      const result = await service.findOne('1');

      expect(result).toEqual(assignorList[0]);
    });
  });

  describe('update', () => {
    it('should return undefined when provided id is not found', async () => {
      const result = await service.update('1', { name: 'John Doe' });

      expect(result).toBeUndefined();
    });

    it('should update an assignor by id', async () => {
      const assignorList = getAssignorSeed({ date: now });
      databaseService.assignor.seed(assignorList);

      const result = await service.update('1', { name: 'Foo Bar' });

      expect(result).toEqual({
        ...assignorList[0],
        name: 'Foo Bar',
      });
    });
  });

  describe('remove', () => {
    it('should return undefined when provided id is not found', async () => {
      const result = await service.remove('1');

      expect(result).toBeUndefined();
    });

    it('should delete an assignor by id', async () => {
      const assignorList = getAssignorSeed({ date: now });
      databaseService.assignor.seed(assignorList);

      const result = await service.remove('2');

      expect(result).toEqual({
        ...assignorList[1],
        deletedAt: expect.any(Date),
      });
    });
  });
});
