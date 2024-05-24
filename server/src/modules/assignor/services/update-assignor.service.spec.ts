import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAssignorService } from './update-assignor.service';
import { AssignorRepository } from '../repositories/assignor.repository';
import { UpdateAssignorDto } from '@infra/http/assignor/dtos/update-assignor.dto';
import { Assignor } from '@prisma/client';
import { left, right } from '@utils/either';

describe('UpdateAssignorService', () => {
  let service: UpdateAssignorService;
  let repository: AssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAssignorService,
        {
          provide: AssignorRepository,
          useValue: {
            findById: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateAssignorService>(UpdateAssignorService);
    repository = module.get<AssignorRepository>(AssignorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update an assignor', async () => {
    const assignor: Assignor = {
      id: 'assignor-id',
      document: '123456789',
      email: 'assignor@example.com',
      phone: '1234567890',
      name: 'Assignor Name',
    };

    const dto: UpdateAssignorDto = {
      document: '987654321',
      name: 'Updated Name',
      phone: '0987654321',
      email: 'updated@example.com',
    };

    jest.spyOn(repository, 'findById').mockResolvedValue(assignor);
    jest.spyOn(repository, 'save').mockResolvedValue(undefined);

    const result = await service.execute('assignor-id', dto);

    expect(repository.findById).toHaveBeenCalledWith('assignor-id');
    expect(repository.save).toHaveBeenCalledWith({
      ...assignor,
      ...dto,
    });
    expect(result).toEqual(
      right({
        ...assignor,
        ...dto,
      }),
    );
  });

  it('should return an error if assignor not found', async () => {
    const dto: UpdateAssignorDto = {
      document: '987654321',
      name: 'Updated Name',
      phone: '0987654321',
      email: 'updated@example.com',
    };

    jest.spyOn(repository, 'findById').mockResolvedValue(null);

    const result = await service.execute('non-existent-id', dto);

    expect(repository.findById).toHaveBeenCalledWith('non-existent-id');
    expect(result).toEqual(left(new Error('Assignor not found')));
  });
});
