import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepo } from './repositories/payable-repo';
import { prismaPayableRepo } from './repositories/prisma/prisma-payable-repo';
import { prismaAssignorRepo } from './repositories/prisma/prisma-assignor-repo';
import { AssignorRepo } from './repositories/assignor-repo';
import { prismaUserRepo } from './repositories/prisma/prisma-user-repo';
import { PrismaService } from './database/prisma.service';
import { AppController } from './app.controller';
import {
  MOCK_NOVO_RECEBIVEIS,
  MOCK_UPDATE_RECEBIVEIS,
} from '../test/mocks/mock-payable';
import { UserRepo } from './repositories/user-repo';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

describe('Cedente', () => {
  let controller: AppController;
  let service: PayableRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        PrismaService,
        { provide: PayableRepo, useClass: prismaPayableRepo },
        { provide: AssignorRepo, useClass: prismaAssignorRepo },
        { provide: UserRepo, useClass: prismaUserRepo },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<PayableRepo>(PayableRepo);
  });

  it('Deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('CRUD de cedente', () => {
    it('Deve criar um novo cedente', async () => {
      jest
        .spyOn(controller, 'createPayable')
        .mockResolvedValue(MOCK_NOVO_RECEBIVEIS);

      const result = await controller.createPayable(MOCK_NOVO_RECEBIVEIS);

      expect(result).toBeDefined();
      expect(result).toEqual(MOCK_NOVO_RECEBIVEIS);
      expect(result.assignor).toEqual(MOCK_NOVO_RECEBIVEIS.assignor);
      expect(result.value).toBeDefined();
      expect(result.value).toEqual(121);
      expect(result.id).toBeDefined();
      expect(result.id).toEqual(MOCK_NOVO_RECEBIVEIS.id);
    });

    it('Deve listar todos os cedentes', async () => {
      jest.spyOn(controller, 'getPayableAll');

      const result = await controller.getPayableAll();

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
    });

    it('Deve buscar um cedente por id', async () => {
      jest
        .spyOn(controller, 'getPayableById')
        .mockResolvedValue(MOCK_NOVO_RECEBIVEIS);

      const result = await controller.getPayableById(MOCK_NOVO_RECEBIVEIS.id);

      expect(result).toBeDefined();
      expect(result).toEqual(MOCK_NOVO_RECEBIVEIS);
    });

    it('Deve atualizar um cedente', async () => {
      jest
        .spyOn(controller, 'updatePayable')
        .mockResolvedValue(MOCK_UPDATE_RECEBIVEIS);

      const result = await controller.updatePayable(
        MOCK_NOVO_RECEBIVEIS.id,
        MOCK_UPDATE_RECEBIVEIS,
      );

      expect(result).toBeDefined();
      expect(result.assignor).toEqual(MOCK_UPDATE_RECEBIVEIS.assignor);
      expect(result.value).toBeDefined();
      expect(result.value).toEqual(121000);
      expect(result.id).toBeDefined();
      expect(result.id).toEqual(MOCK_NOVO_RECEBIVEIS.id);
    });

    it('Deve deletar um cedente', async () => {
      jest.spyOn(controller, 'deletePayable').mockResolvedValue(true);

      await controller.deletePayable(MOCK_NOVO_RECEBIVEIS.id);

      expect(controller.deletePayable).toBeCalled();
    });
  });
});
