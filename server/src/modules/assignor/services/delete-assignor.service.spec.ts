import { Test, TestingModule } from '@nestjs/testing';
import { DeleteAssignorService } from './delete-assignor.service';
import { AssignorRepository } from '../repositories/assignor.repository';
import { left, right } from '@utils/either';

describe('DeleteAssignorService', () => {
  let service: DeleteAssignorService;
  let repository: AssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteAssignorService,
        {
          provide: AssignorRepository,
          useValue: {
            findById: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteAssignorService>(DeleteAssignorService);
    repository = module.get<AssignorRepository>(AssignorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete an assignor', async () => {
    const assignor = {
      id: 'assignor-id',
      document: '123456789',
      email: 'assignor@example.com',
      phone: '1234567890',
      name: 'Assignor Name',
    };

    jest.spyOn(repository, 'findById').mockResolvedValue(assignor);
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    const result = await service.execute('assignor-id');

    expect(repository.findById).toHaveBeenCalledWith('assignor-id');
    expect(repository.delete).toHaveBeenCalledWith('assignor-id');
    expect(result).toEqual(right(undefined));
  });

  it('should return an error if assignor not found', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValue(null);

    const result = await service.execute('non-existent-id');

    expect(repository.findById).toHaveBeenCalledWith('non-existent-id');
    expect(result).toEqual(left(new Error('Assignor not found')));
  });
});
