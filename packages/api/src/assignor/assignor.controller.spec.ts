import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { AssignorRepository } from './repositories/assignor-repository';
import { assignorMock } from './assignor.service.spec';
import { Assignor } from './entities/assignor.entity';

describe('Assignor Controller', () => {
  let controller: AssignorController;
  let service: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [AssignorService, { provide: AssignorRepository, useValue: {} }],
    }).compile();

    controller = module.get<AssignorController>(AssignorController);
    service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(controller).toBeInstanceOf(AssignorController);
  });

  it('should create an assignor and return it', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(assignorMock);

    const assignor = await controller.create(assignorMock);

    expect(assignor).toEqual(assignorMock);
    expect(assignor).toBeInstanceOf(Assignor);
  });

  it('should return all assignors', async () => {
    jest.spyOn(service, 'getAll').mockResolvedValue([assignorMock]);

    const assignors = await controller.getAll();

    expect(assignors).toEqual([assignorMock]);
  });

  it('should return an empty array if has no assignors', async () => {
    jest.spyOn(service, 'getAll').mockResolvedValue([]);

    const assignors = await controller.getAll();

    expect(assignors).toEqual([]);
  });

  it('should return a assignor after updating it', async () => {
    const newAssignor = new Assignor('1', 'John Doe', 'johndoe@email.com', '1239494', '138249283');
    jest.spyOn(service, 'update').mockResolvedValue(newAssignor);

    const assignor = await controller.update('1', newAssignor);

    expect(assignor).toEqual(newAssignor);
  });
});
