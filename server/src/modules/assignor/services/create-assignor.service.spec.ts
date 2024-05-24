import { Test, TestingModule } from '@nestjs/testing';
import { CreateAssignorService } from './create-assignor.service';
import { AssignorRepository } from '../repositories/assignor.repository';
import { CreateAssignorDto } from '@infra/http/assignor/dtos/create-assignor.dto';
import { Assignor } from '../entities/assignor.entity';
import { right } from '@utils/either';

describe('CreateAssignorService', () => {
  let service: CreateAssignorService;
  let repository: AssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAssignorService,
        {
          provide: AssignorRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateAssignorService>(CreateAssignorService);
    repository = module.get<AssignorRepository>(AssignorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an assignor', async () => {
    const dto: CreateAssignorDto = {
      document: '123456789',
      email: 'assignor@example.com',
      name: 'Assignor Name',
      phone: '1234567890',
    };

    const assignor = Assignor.create({
      document: dto.document,
      payables: [],
      email: dto.email,
      name: dto.name,
      phone: dto.phone,
    });

    jest.spyOn(repository, 'create').mockResolvedValue(undefined);

    const result = await service.execute(dto);

    expect(repository.create).toHaveBeenCalledWith(assignor);
    expect(result).toEqual(right(assignor));
  });
});
