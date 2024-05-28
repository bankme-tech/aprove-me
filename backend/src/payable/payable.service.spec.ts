import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryDatabase } from 'src/infra/database/inMemory/';
import {
  getAssignorSeed,
  getPayableSeed,
} from 'src/infra/database/inMemory/seed';
import { PrismaService } from 'src/infra/database/prisma.service';
import { NotFound, UnprocessableEntity } from 'src/shared/domain/errors';
import { PayableService } from './payable.service';

const now = new Date();

interface DatabaseService {
  assignor: InMemoryDatabase;
  payable: InMemoryDatabase;
}

describe('PayableService', () => {
  let service: PayableService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        {
          provide: PrismaService,
          useValue: {
            assignor: new InMemoryDatabase({ date: now }),
            payable: new InMemoryDatabase({ date: now }),
          },
        },
      ],
    }).compile();

    service = module.get<PayableService>(PayableService);
    databaseService = module.get<DatabaseService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return undefined when provided assignor id is not found', async () => {
      const result = await service.create({
        value: 100,
        emissionDate: new Date('2024-05-21'),
        assignorId: '1',
      });

      expect(result).toBeUndefined();
    });

    it('should create a new payable', async () => {
      const assignorList = getAssignorSeed({ date: now });
      databaseService.assignor.seed(assignorList);

      const result = await service.create({
        value: 100,
        emissionDate: new Date('2024-05-21'),
        assignorId: '1',
      });

      expect(result).toEqual({
        id: '1',
        value: 100,
        emissionDate: new Date('2024-05-21'),
        assignorId: '1',
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      });
    });
  });

  describe('findAll', () => {
    it('should list all payable', async () => {
      const payableList = getPayableSeed({ date: now });
      databaseService.payable.seed(payableList);

      const result = await service.findAll();

      expect(result).toEqual(payableList);
    });
  });

  describe('findOne', () => {
    it('should return undefined when provided id is not found', async () => {
      const result = await service.findOne('1');

      expect(result).toBeUndefined();
    });

    it('should get a payable by id', async () => {
      const payableList = getPayableSeed({ date: now });
      databaseService.payable.seed(payableList);

      const result = await service.findOne('1');

      expect(result).toEqual(payableList[0]);
    });
  });

  describe('update', () => {
    it('should return undefined when provided payable id is not found', async () => {
      const result = await service.update('1', { value: 10 });

      expect(result.isLeft()).toBeTruthy();
      expect(result.value).toBeInstanceOf(NotFound);
    });

    it('should return undefined when provided assignor id is not found', async () => {
      const payableList = getPayableSeed({ date: now });
      databaseService.payable.seed(payableList);

      const result = await service.update('1', { assignorId: '1' });

      expect(result.isLeft()).toBeTruthy();
      expect(result.value).toBeInstanceOf(UnprocessableEntity);
    });

    it('should update a payable by id', async () => {
      const assignorList = getAssignorSeed({ date: now });
      const payableList = getPayableSeed({ date: now });
      databaseService.assignor.seed(assignorList);
      databaseService.payable.seed(payableList);

      const result = await service.update('1', { value: 230 });

      expect(result.isRight()).toBeTruthy();
      expect(result.value).toEqual({
        ...payableList[0],
        value: 230,
      });
    });
  });

  describe('remove', () => {
    it('should return undefined when provided id is not found', async () => {
      const result = await service.remove('1');

      expect(result).toBeUndefined();
    });

    it('should delete a payable by id', async () => {
      const payableList = getPayableSeed({ date: now });
      databaseService.payable.seed(payableList);

      const result = await service.remove('3');

      expect(result).toEqual({
        ...payableList[2],
        deletedAt: expect.any(Date),
      });
    });
  });
});
