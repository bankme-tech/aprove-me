import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it } from 'node:test';

import { CreatePayableDto } from '@infra/http/payable/dtos/create-payable.dto';
import { AssignorRepository } from '@modules/assignor/repositories/assignor.repository';
import { PayableRepository } from '../repositories/payable.repository';
import { CreatePayableService } from './create-payable.service';
import { right, left } from '@utils/either';

describe('CreatePayableService', () => {
  let service: CreatePayableService;
  let payableRepository: PayableRepository;
  let assignorRepository: AssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePayableService,
        {
          provide: PayableRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: AssignorRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreatePayableService>(CreatePayableService);
    payableRepository = module.get<PayableRepository>(PayableRepository);
    assignorRepository = module.get<AssignorRepository>(AssignorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a payable', async () => {
    const assignor = {
      id: 'assignor-id',
      document: '123456789',
      email: 'assignor@example.com',
      phone: '1234567890',
      name: 'Assignor Name',
      payables: [],
    };
    const dto: CreatePayableDto = {
      id: 'payable-id',
      value: 1000,
      assignorId: 'assignor-id',
      emissionDate: new Date().toISOString(),
    };

    jest.spyOn(assignorRepository, 'findById').mockResolvedValue(assignor);
    jest.spyOn(payableRepository, 'create').mockResolvedValue(undefined);

    const result = await service.execute(dto);

    expect(assignorRepository.findById).toHaveBeenCalledWith('assignor-id');
    expect(payableRepository.create).toHaveBeenCalled();
    expect(result).toEqual(right(expect.any(Object)));
  });

  it('should return an error if assignor not found', async () => {
    const dto: CreatePayableDto = {
      id: 'payable-id',
      value: 1000,
      assignorId: 'non-existent-id',
      emissionDate: new Date().toISOString(),
    };

    jest.spyOn(assignorRepository, 'findById').mockResolvedValue(null);

    const result = await service.execute(dto);

    expect(assignorRepository.findById).toHaveBeenCalledWith('non-existent-id');
    expect(result).toEqual(left(new Error('Assignor not found')));
  });
});
