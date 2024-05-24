import { Test, TestingModule } from '@nestjs/testing';
import { ReadPayableService } from './read-payable.service';
import { PayableRepository } from '../repositories/payable.repository';
import { Payable } from '../entities/payable.entity';

describe('ReadPayableService', () => {
  let service: ReadPayableService;
  let repository: PayableRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReadPayableService,
        {
          provide: PayableRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReadPayableService>(ReadPayableService);
    repository = module.get<PayableRepository>(PayableRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a payable', async () => {
    const payable = {
      id: 'payable-id',
      value: 1000,
      emissionDate: new Date(),
      assignorId: 'assignor-id',
    };

    jest.spyOn(repository, 'findById').mockResolvedValue(payable as Payable);

    const result = await service.execute('payable-id');

    expect(repository.findById).toHaveBeenCalledWith('payable-id');
    expect(result).toEqual(payable);
  });

  it('should throw an error if payable not found', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValue(null);

    await expect(service.execute('non-existent-id')).rejects.toThrow(
      new Error('Payable not found'),
    );
  });
});
