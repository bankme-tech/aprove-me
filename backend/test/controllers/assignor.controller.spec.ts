import { forwardRef } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AssignorController } from '../../src/assignor/assignor.controller';
import { AssignorModule } from '../../src/assignor/assignor.module';
import { AssignorService } from '../../src/assignor/assignor.service';
import { AuthModule } from '../../src/auth/auth.module';
import {
  assignorServiceCreated,
  assignorServiceFindAll,
  assignorServiceFindById,
  assignorServiceUpdated,
  createdDtoAssignor,
  updateDtoAssignor,
} from '../mocks/mockResults';

describe('AssignorService', () => {
  let assignorController: AssignorController;
  let assignorService: AssignorService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [forwardRef(() => AuthModule), forwardRef(() => AssignorModule)],
      controllers: [AssignorController],
      providers: [
        {
          provide: AssignorService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();
    assignorService = moduleRef.get<AssignorService>(AssignorService);
    assignorController = moduleRef.get<AssignorController>(AssignorController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('Verifica se o controller está funcionando corretamente.', () => {
    it('Deve retornar um array de Assignors', async () => {
      jest
        .spyOn(assignorService, 'findAll')
        .mockImplementation(async () => assignorServiceFindAll);

      expect(await assignorController.getAllAssignors()).toBe(
        assignorServiceFindAll,
      );
    });

    it('Deve retornar um único assignor', async () => {
      jest
        .spyOn(assignorService, 'findOne')
        .mockResolvedValue(assignorServiceFindById);

      expect(await assignorController.findAssignorById('2')).toBe(
        assignorServiceFindById,
      );
    });

    it('Deve retornar o assignor criado.', async () => {
      jest
        .spyOn(assignorService, 'create')
        .mockResolvedValue(assignorServiceCreated);

      expect(await assignorController.createAssignor(createdDtoAssignor)).toBe(
        assignorServiceCreated,
      );
    });

    it('Deve retornar o assignor atualizado.', async () => {
      jest
        .spyOn(assignorService, 'findOne')
        .mockResolvedValue(assignorServiceFindById);

      jest
        .spyOn(assignorService, 'update')
        .mockResolvedValue(assignorServiceUpdated);

      expect(
        await assignorController.updateAssignor('3', updateDtoAssignor),
      ).toBe(assignorServiceUpdated);
    });
  });
});
