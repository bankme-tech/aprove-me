import { Test, TestingModule } from '@nestjs/testing';
import { GetAssignorsController } from './get-assignors.controller';
import { GetAssignorsService } from '../../services/get-assignors/get-assignors.service';
import { InMemoryAssignorRepository } from '../../repositories/in-memory/assignor.repository';
import { IAssignorRepository } from '../../repositories/interfaces/assignor.repository-interface';
import { makeAssignor } from '../../test/factories/make-assignor';

describe('GetAssignorsController', () => {
  let controller: GetAssignorsController;
  let repository: InMemoryAssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAssignorsController],
      providers: [
        GetAssignorsService,
        {
          useClass: InMemoryAssignorRepository,
          provide: IAssignorRepository,
        },
      ],
    }).compile();

    controller = module.get<GetAssignorsController>(GetAssignorsController);
    repository = module.get(IAssignorRepository);
  });

  it('should get all assignors', async () => {
    const [assignorA, assignorB, assignorC] = [
      makeAssignor(),
      makeAssignor(),
      makeAssignor(),
    ];
    repository.items.push(assignorA);
    repository.items.push(assignorB);
    repository.items.push(assignorC);

    const result = await controller.handle();

    expect(result).toBeInstanceOf<Array<Record<string, unknown>>>;
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: assignorA.id }),
        expect.objectContaining({ id: assignorB.id }),
        expect.objectContaining({ id: assignorC.id }),
      ]),
    );
  });
});
