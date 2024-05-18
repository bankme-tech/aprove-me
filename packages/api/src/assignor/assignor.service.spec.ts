import { randomUUID } from 'crypto';
import { AssignorService } from './assignor.service';
import { Assignor } from './entities/assignor.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { AssignorRepository } from './repositories/assignor-repository';

export const assignorMock = new Assignor(
  randomUUID(),
  'John',
  'john@doe.com',
  '(81)12345-6789',
  '123.456.789-12',
);

const AssignorRepositoryMock = {
  create: jest.fn().mockResolvedValue(assignorMock),
};

describe('Assignor Service', () => {
  let service: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorService,
        { provide: AssignorRepository, useValue: AssignorRepositoryMock },
      ],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(service).toBeInstanceOf(AssignorService);
  });

  it('should create an assignor and return it', async () => {
    const assignor = await service.create(assignorMock);

    expect(assignor).toEqual(assignorMock);
    expect(assignor).toBeInstanceOf(Assignor);
  });
});
