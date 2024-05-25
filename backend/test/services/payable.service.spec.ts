import { BullModule } from '@nestjs/bull';
import { Test } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { AssignorController } from '../../src/assignor/assignor.controller';
import { AssignorService } from '../../src/assignor/assignor.service';
import { PayableController } from '../../src/payable/payable.controller';
import { PayableService } from '../../src/payable/payable.service';
import { SendEmailModule } from '../../src/send-email/send-email.module';
import {
  createDtoPayable,
  payableServiceCreated,
  payableServiceFindAll,
  payableServiceFindById,
  payableServiceUpdated,
  updateDtoPayable,
} from '../mocks/mockResults';

describe('PayableService', () => {
  let payableService: PayableService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        PrismaModule,
        SendEmailModule,
        BullModule.registerQueue({
          name: 'payable',
        }),
      ],
      controllers: [AuthController, AssignorController, PayableController],
      providers: [AssignorService, PayableService],
    }).compile();

    payableService = moduleRef.get<PayableService>(PayableService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('Verifica se o serviço está funcionando corretamente.', () => {
    it('Deve retornar um array de payables', async () => {
      jest
        .spyOn(prismaService.payable, 'findMany')
        .mockResolvedValue(payableServiceFindAll);

      expect(await payableService.findAll()).toBe(payableServiceFindAll);
    });

    it('Deve retornar um único payable', async () => {
      jest
        .spyOn(prismaService.payable, 'findUnique')
        .mockResolvedValue(payableServiceFindById);

      expect(await payableService.findOne('2')).toBe(payableServiceFindById);
    });

    it('Deve retornar o payable criado.', async () => {
      jest
        .spyOn(prismaService.payable, 'create')
        .mockResolvedValue(payableServiceCreated);

      expect(await payableService.create(createDtoPayable)).toBe(
        payableServiceCreated,
      );
    });

    it('Deve retornar o payable atualizado.', async () => {
      jest
        .spyOn(prismaService.payable, 'findUnique')
        .mockResolvedValue(payableServiceFindById);

      jest
        .spyOn(prismaService.payable, 'update')
        .mockResolvedValue(payableServiceUpdated);

      expect(await payableService.update('3', updateDtoPayable)).toBe(
        payableServiceUpdated,
      );
    });
  });
});
