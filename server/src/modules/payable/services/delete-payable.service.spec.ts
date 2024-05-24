import { Test, TestingModule } from '@nestjs/testing';
import { DeletePayableService } from './delete-payable.service';
import { PayableRepository } from '../repositories/payable.repository';
import { Payable } from '../entities/payable.entity';

describe('DeletePayableService', () => {
  let service: DeletePayableService;
  let repository: PayableRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePayableService,
        {
          provide: PayableRepository,
          useValue: {
            findById: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DeletePayableService>(DeletePayableService);
    repository = module.get<PayableRepository>(PayableRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete a payable', async () => {
    const payable = {
      id: 'payable-id',
      value: 1000,
      emissionDate: new Date(),
      assignorId: 'assignor-id',
    };

    jest.spyOn(repository, 'findById').mockResolvedValue(payable as Payable);
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    const result = await service.execute('payable-id');

    expect(repository.findById).toHaveBeenCalledWith('payable-id');
    expect(repository.delete).toHaveBeenCalledWith('payable-id');
    expect(result).toEqual(payable);
  });

  it('should throw an error if payable not found', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValue(null);

    await expect(service.execute('non-existent-id')).rejects.toThrow(
      new Error('Payable not found'),
    );
  });
});
