import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import PayableRepository from './repositories/payableRepository';
import AssignorRepository from '../assignor/repositories/assignorRepository';
import { Payable } from './entities/payable.entity';
import { HttpException } from '@nestjs/common';
import { Assignor } from '../assignor/entities/assignor.entity';

const payableMock = new Payable('1', 100, new Date(), '1');
const assignorMock = new Assignor('1', '12345678901', 'r@r.com', '12345678', 'Rafael');

const payableRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(payableMock),
  findAll: jest.fn().mockResolvedValue([payableMock]),
  create: jest.fn().mockResolvedValue(payableMock),
  update: jest.fn().mockResolvedValue(payableMock),
  delete: jest.fn().mockResolvedValue(undefined),
};

const assignorRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(assignorMock),
};

describe('PayableService', () => {
  let service: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        {
          provide: PayableRepository,
          useValue: payableRepositoryMock,
        },
        {
          provide: AssignorRepository,
          useValue: assignorRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<PayableService>(PayableService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a payable', async () => {
    const payable = await service.findOne('1');
    expect(payable).toEqual(payableMock);
  });

  it('shold throw an exception when payable is not found', async () => {
    jest.spyOn(payableRepositoryMock, 'findOne').mockResolvedValue(null);
    try {
      await service.findOne('2');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(404);
    }
  });

  it('should return a list of payables', async () => {
    const payables = await service.findAll();
    expect(payables).toEqual([payableMock]);
  });

  it('should return a payable after creating it', async () => {
    const payable = await service.create(payableMock);
    expect(payable).toEqual(payableMock);
  });

  it('should throw an exception when assignor is not found', async () => {
    jest.spyOn(assignorRepositoryMock, 'findOne').mockResolvedValue(null);
    try {
      await service.create(payableMock);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(404);
      expect(error.message).toBe('Assignor not found');
    }
  });

  it('should return a payable after updating it', async () => {
    jest.spyOn(payableRepositoryMock, 'findOne').mockResolvedValue(payableMock);
    const payable = await service.update('1', payableMock);
    expect(payable).toEqual(payableMock);
  });

  it('should throw an exception when payable is not found', async () => {
    jest.spyOn(payableRepositoryMock, 'findOne').mockResolvedValue(null);
    try {
      await service.update('2', payableMock);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(404);
    }
  });

  it('should return nothing when deleting a payable', async () => {
    jest.spyOn(payableRepositoryMock, 'findOne').mockResolvedValue(payableMock);
    const payable = await service.remove('1');
    expect(payable).toBeUndefined();
  });

  it('should throw an exception when payable is not found', async () => {
    jest.spyOn(payableRepositoryMock, 'findOne').mockResolvedValue(null);
    try {
      await service.remove('2');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(404);
      expect(error.message).toBe('Payable not found');
    }
  });
});
