import { BullModule } from '@nestjs/bull';
import { Test } from '@nestjs/testing';
import { PrismaModule } from '../../prisma/prisma.module';
import { AssignorController } from '../../src/assignor/assignor.controller';
import { AssignorService } from '../../src/assignor/assignor.service';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthModule } from '../../src/auth/auth.module';
import { PayableController } from '../../src/payable/payable.controller';
import { PayableService } from '../../src/payable/payable.service';
import {
  createDtoPayable,
  payableServiceCreated,
  payableServiceFindAll,
  payableServiceFindById,
  payableServiceUpdated,
  updateDtoPayable,
} from '../mocks/mockResults';

describe('PayableController', () => {
  let payableController: PayableController;
  let payableService: PayableService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        PrismaModule,
        AuthModule,
        BullModule.registerQueue({
          name: 'payable',
        }),
      ],
      controllers: [AuthController, PayableController, AssignorController],
      providers: [
        {
          provide: PayableService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
        AssignorService,
      ],
    }).compile();

    payableService = moduleRef.get<PayableService>(PayableService);
    payableController = moduleRef.get<PayableController>(PayableController);
  });

  describe('Verifica se o controller de payable está funcionando corretamente.', () => {
    it('Deve retornar um array de Payables', async () => {
      jest
        .spyOn(payableService, 'findAll')
        .mockResolvedValue(payableServiceFindAll);

      expect(await payableController.getAllPayables()).toBe(
        payableServiceFindAll,
      );
    });

    it('Deve retornar um único payable', async () => {
      jest
        .spyOn(payableService, 'findOne')
        .mockResolvedValue(payableServiceFindById);

      expect(await payableController.findPayableById('2')).toBe(
        payableServiceFindById,
      );
    });

    it('Deve retornar o payable criado.', async () => {
      jest
        .spyOn(payableService, 'create')
        .mockResolvedValue(payableServiceCreated);

      expect(await payableController.createPayable(createDtoPayable)).toBe(
        payableServiceCreated,
      );
    });

    it('Deve retornar o payable atualizado.', async () => {
      jest
        .spyOn(payableService, 'findOne')
        .mockResolvedValue(payableServiceFindById);

      jest
        .spyOn(payableService, 'update')
        .mockResolvedValue(payableServiceUpdated);

      expect(await payableController.updatePayable('3', updateDtoPayable)).toBe(
        payableServiceUpdated,
      );
    });
  });
});
