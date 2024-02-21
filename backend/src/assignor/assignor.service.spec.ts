import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import AssignorRepository from './repositories/assignorRepository';
import { Assignor } from './entities/assignor.entity';
import { HttpException } from '@nestjs/common';

export const assignorMock = new Assignor('1', '12345678901', 'r@r.com', '12345678', 'Rafael');

const assignorRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(assignorMock),
  findAll: jest.fn().mockResolvedValue([assignorMock]),
  create: jest.fn().mockResolvedValue(assignorMock),
  update: jest.fn().mockResolvedValue(assignorMock),
  delete: jest.fn().mockResolvedValue(undefined),
};

describe('AssignorService', () => {
  let service: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorService,
        {
          provide: AssignorRepository,
          useValue: assignorRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an assignor', async () => {
    const assignor = await service.findOne('1');
    expect(assignor).toEqual(assignorMock);
  });

  it('should throw an exception when assignor is not found', async () => {
    jest.spyOn(assignorRepositoryMock, 'findOne').mockResolvedValue(null);
    try {
      await service.findOne('2');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(404);
      expect(error.message).toBe('Assignor not found');
    }
  });

  it('should return a list of assignor', async () => {
    const assignor = await service.findAll();
    expect(assignor).toEqual([assignorMock]);
  });

  it('should return an assignor after creating it', async () => {
    const assignor = await service.create(assignorMock);
    expect(assignor).toEqual(assignorMock);
  });

  it('should return an assignor after updating it', async () => {
    jest.spyOn(assignorRepositoryMock, 'findOne').mockResolvedValue(assignorMock);
    const assignor = await service.update('1', assignorMock);
    expect(assignor).toEqual(assignorMock);
  });

  it('should throw an exception when assignor is not found', async () => {
    jest.spyOn(assignorRepositoryMock, 'findOne').mockResolvedValue(null);
    try {
      await service.update('2', assignorMock);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(404);
      expect(error.message).toBe('Assignor not found');
    }
  });

  it('should return nothing after deleting an assignor', async () => {
    jest.spyOn(assignorRepositoryMock, 'findOne').mockResolvedValue(assignorMock);
    const assignor = await service.remove('1');
    expect(assignor).toBeUndefined();
  });

  it('should throw an exception when assignor is not found', async () => {
    jest.spyOn(assignorRepositoryMock, 'findOne').mockResolvedValue(null);
    try {
      await service.remove('2');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(404);
      expect(error.message).toBe('Assignor not found');
    }
  });
});
