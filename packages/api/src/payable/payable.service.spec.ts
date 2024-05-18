import { PayableService } from './payable.service';
import { NotFoundException } from '@nestjs/common';
import { Payable } from './entities/payable.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepository } from './repositories/payable-repository';
import { AssignorRepository } from '../assignor/repositories/assignor-repository';
import { AssignorRepositoryMock, assignorMock } from '@assignor/assignor.service.spec';

export const payableMock = new Payable('1', 100, assignorMock.id, new Date());

export class PayableRepositoryMock implements PayableRepository {
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
});
