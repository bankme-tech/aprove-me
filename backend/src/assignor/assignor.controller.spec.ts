import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import AssignorRepository from './repositories/assignorRepository';
import { assignorMock } from './assignor.service.spec';

describe('AssignorController', () => {
  let controller: AssignorController;
  let service: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [
        AssignorService,
        {
          provide: AssignorRepository,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AssignorController>(AssignorController);
    service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an assignor in findOne', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(async () => assignorMock);
    const assignor = await controller.findOne('1');
    expect(assignor).toEqual(assignorMock);
  });

  it('should return a list of assignor in findAll', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(async () => [assignorMock]);
    const assignor = await controller.findAll();
    expect(assignor).toEqual([assignorMock]);
  });

  it('should return a assignor after creating it', async () => {
    jest.spyOn(service, 'create').mockImplementation(async () => assignorMock);
    const assignor = await controller.create(assignorMock);
    expect(assignor).toEqual(assignorMock);
  });

  it('should return a assignor after updating it', async () => {
    jest.spyOn(service, 'update').mockImplementation(async () => assignorMock);
    const assignor = await controller.update('1', assignorMock);
    expect(assignor).toEqual(assignorMock);
  });

  it('should return a message after deleting a assignor', async () => {
    jest.spyOn(service, 'remove').mockImplementation(async () => undefined);
    const assignor = await controller.remove('1');
    expect(assignor).toEqual({ message: 'Assignor deleted' });
  });
});
