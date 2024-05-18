import { PayableService } from './payable.service';
import { NotFoundException } from '@nestjs/common';
import { Payable } from './entities/payable.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepository } from './repositories/payable-repository';
import { AssignorRepository } from '../assignor/repositories/assignor-repository';
import { AssignorRepositoryMock, assignorMock } from '@assignor/assignor.service.spec';

export const payableMock = new Payable('1', 100, assignorMock.id, new Date());

export class PayableRepositoryMock implements PayableRepository {
  async getAll() {
    return [payableMock];
  }

  async delete() {
    return;
  }

  async findById() {
    return payableMock;
  }

  async update() {
    return payableMock;
  }

  async create() {
    return payableMock;
  }
}

describe('Payable Service', () => {
  let service: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        {
          provide: PayableRepository,
          useClass: PayableRepositoryMock,
        },
        {
          provide: AssignorRepository,
          useClass: AssignorRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<PayableService>(PayableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a payable and return it', async () => {
    jest.spyOn(AssignorRepositoryMock.prototype, 'findById').mockResolvedValue(assignorMock);

    const payable = await service.create(payableMock);

    expect(payable).toEqual(payableMock);
  });

  it('should throw an exception when assignor is not found', async () => {
    jest.spyOn(AssignorRepositoryMock.prototype, 'findById').mockResolvedValue(null);

    try {
      await service.create(payableMock);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.status).toBe(404);
      expect(error.message).toBe('assignor not found');
    }
  });

  it('should return nothing when deleting a payable', async () => {
    expect(await service.delete('1')).toBeUndefined();
  });

  it('should return a payable after updating it', async () => {
    const newPayable = new Payable('1', 50, assignorMock.id, new Date());
    jest.spyOn(PayableRepositoryMock.prototype, 'update').mockResolvedValue(newPayable);

    const payable = await service.update('1', newPayable);

    expect(payable).toEqual(newPayable);
  });

  it('should throw an exception when payable is not found', async () => {
    jest.spyOn(PayableRepositoryMock.prototype, 'findById').mockResolvedValue(null);

    try {
      await service.findById('2');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.status).toBe(404);
      expect(error.message).toBe('payable not found');
    }
  });

  it('should return a payable if exists', async () => {
    jest.spyOn(PayableRepositoryMock.prototype, 'findById').mockResolvedValue(payableMock);

    const payable = await service.findById('1');

    expect(payable).toBeInstanceOf(Payable);
    expect(payable).toEqual(payableMock);
  });
});
