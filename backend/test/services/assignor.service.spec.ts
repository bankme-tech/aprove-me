import { BullModule } from '@nestjs/bull';
import { Test } from '@nestjs/testing';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { AssignorController } from '../../src/assignor/assignor.controller';
import { AssignorService } from '../../src/assignor/assignor.service';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthModule } from '../../src/auth/auth.module';
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
  let assignorService: AssignorService;
  let prismaService: PrismaService;

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
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('Verifica se o serviço está funcionando corretamente.', () => {
    it('Deve retornar um array de Assignors', async () => {
      jest
        .spyOn(prismaService.assignor, 'findMany')
        .mockResolvedValue(assignorServiceFindAll);

      expect(await assignorService.findAll()).toBe(assignorServiceFindAll);
    });

    it('Deve retornar um único assignor', async () => {
      jest
        .spyOn(prismaService.assignor, 'findUnique')
        .mockResolvedValue(assignorServiceFindById);

      expect(await assignorService.findOne('2')).toBe(assignorServiceFindById);
    });

    it('Deve retornar o assignor criado.', async () => {
      jest
        .spyOn(prismaService.assignor, 'create')
        .mockResolvedValue(assignorServiceCreated);

      expect(await assignorService.create(createdDtoAssignor)).toBe(
        assignorServiceCreated,
      );
    });

    it('Deve retornar o assignor atualizado.', async () => {
      jest
        .spyOn(prismaService.assignor, 'findUnique')
        .mockResolvedValue(assignorServiceFindById);

      jest
        .spyOn(prismaService.assignor, 'update')
        .mockResolvedValue(assignorServiceUpdated);

      expect(await assignorService.update('3', updateDtoAssignor)).toBe(
        assignorServiceUpdated,
      );
    });
  });
});
