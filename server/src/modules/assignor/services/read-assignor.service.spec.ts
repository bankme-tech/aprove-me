import { Test, TestingModule } from '@nestjs/testing';
import { ReadAssignorService } from './read-assignor.service';
import { AssignorRepository } from '../repositories/assignor.repository';
import { Assignor } from '@prisma/client';

describe('ReadAssignorService', () => {
  let service: ReadAssignorService;
  let repository: AssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReadAssignorService,
        {
          provide: AssignorRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReadAssignorService>(ReadAssignorService);
    repository = module.get<AssignorRepository>(AssignorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an assignor', async () => {
    const assignor: Assignor = {
      id: 'assignor-id',
      document: '123456789',
      email: 'assignor@example.com',
      phone: '1234567890',
      name: 'Assignor Name',
    };

    jest.spyOn(repository, 'findById').mockResolvedValue(assignor);

    const result = await service.execute('assignor-id');

    expect(repository.findById).toHaveBeenCalledWith('assignor-id');
    expect(result).toEqual(assignor);
  });

  it('should throw an error if assignor not found', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValue(null);

    await expect(service.execute('non-existent-id')).rejects.toThrow(
      new Error('Assignor not found'),
    );
  });
});
