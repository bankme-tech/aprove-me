import { Test, TestingModule } from '@nestjs/testing';
import { RegisterAssignorService } from './register-assignor.service';
import { IAssignorRepository } from '../../repositories/interfaces/assignor.repository-interface';
import { InMemoryAssignorRepository } from '../../repositories/in-memory/assignor.repository';
import { InvalidEntityEntry } from '~/common/exceptions/invalid-entity-entry.exception';

describe('RegisterAssignorService', () => {
  let service: RegisterAssignorService;
  let repository: InMemoryAssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterAssignorService,
        {
          useClass: InMemoryAssignorRepository,
          provide: IAssignorRepository,
        },
      ],
    }).compile();

    service = module.get<RegisterAssignorService>(RegisterAssignorService);
    repository = module.get(IAssignorRepository);
  });

  it('should register an assignor', async () => {
    expect(repository.items.length).toBe(0);

    const result = await service.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '123.456.789-00',
      phone: '+55 11 90000-0000',
    });

    expect(result.isRight()).toBeTruthy();

    expect(repository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'John Doe',
          email: 'johndoe@example.com',
        }),
      ]),
    );
  });

  it('should not register an assignor with invalid entry', async () => {
    const result = await service.execute({
      name: 'John Doe',
      email: 'fake-email',
      document: '123.456.789-00',
      phone: '+55 11 90000-0000',
    });

    expect(result.isLeft()).toBeTruthy();

    expect(result.value).toBeInstanceOf(InvalidEntityEntry);
  });
});
