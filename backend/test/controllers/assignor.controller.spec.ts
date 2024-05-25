import { BullModule } from '@nestjs/bull';
import { Test } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { AssignorController } from '../../src/assignor/assignor.controller';
import { AssignorService } from '../../src/assignor/assignor.service';
import { PayableController } from '../../src/payable/payable.controller';
import { PayableService } from '../../src/payable/payable.service';
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
      imports: [
        PrismaModule,
        AuthModule,
        BullModule.registerQueue({
          name: 'payable',
        }),
      ],
      controllers: [AuthController, AssignorController, PayableController],
      providers: [AssignorService, PayableService],
    }).compile();

    assignorService = moduleRef.get<AssignorService>(AssignorService);
    assignorController = moduleRef.get<AssignorController>(AssignorController);
  });

  describe('Verifica se o controller está funcionando corretamente.', () => {
    it('Deve retornar um array de Assignors', async () => {
      jest
        .spyOn(assignorService, 'findAll')
        .mockResolvedValue(assignorServiceFindAll);

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
