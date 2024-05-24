import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepo } from './repositories/payable-repo';
import { prismaPayableRepo } from './repositories/prisma/prisma-payable-repo';
import { prismaAssignorRepo } from './repositories/prisma/prisma-assignor-repo';
import { AssignorRepo } from './repositories/assignor-repo';
import { prismaUserRepo } from './repositories/prisma/prisma-user-repo';
import { PrismaService } from './database/prisma.service';
import { AppController } from './app.controller';
import {
  MOCK_NOVO_CEDENTE,
  MOCK_UPDATE_CEDENTE,
} from '../test/mocks/mock-assignor';
import { UserRepo } from './repositories/user-repo';

describe('Cedente', () => {
  let controller: AppController;
  let service: AssignorRepo;

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
    service = module.get<AssignorRepo>(AssignorRepo);
  });

  it('Deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('CRUD de cedente', () => {
    it('Deve criar um novo cedente', async () => {
      jest
        .spyOn(controller, 'createAssignor')
        .mockResolvedValue(MOCK_NOVO_CEDENTE);

      const result = await controller.createAssignor(MOCK_NOVO_CEDENTE);

      expect(result).toBeDefined();
      expect(result).toEqual(MOCK_NOVO_CEDENTE);
      expect(result.document).toEqual('aaaaaaaaaaaaa');
      expect(result.email).toBeDefined();
      expect(result.email).toEqual(MOCK_NOVO_CEDENTE.email);
      expect(result.id).toBeDefined();
      expect(result.id).toEqual(MOCK_NOVO_CEDENTE.id);
    });

    it('Deve listar todos os cedentes', async () => {
      jest.spyOn(controller, 'getAssignorsAll');

      const result = await controller.getAssignorsAll();

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
    });

    it('Deve buscar um cedente por id', async () => {
      jest
        .spyOn(controller, 'getAssignorById')
        .mockResolvedValue(MOCK_NOVO_CEDENTE);

      const result = await controller.getAssignorById(MOCK_NOVO_CEDENTE.id);

      expect(result).toBeDefined();
      expect(result).toEqual(MOCK_NOVO_CEDENTE);
    });

    it('Deve atualizar um cedente', async () => {
      jest
        .spyOn(controller, 'updateAssignor')
        .mockResolvedValue(MOCK_UPDATE_CEDENTE);

      const result = await controller.updateAssignor(
        MOCK_NOVO_CEDENTE.id,
        MOCK_UPDATE_CEDENTE,
      );

      expect(result).toBeDefined();
      expect(result.document).toEqual('bbbbbbbbbbbbb');
      expect(result.email).toBeDefined();
      expect(result.email).toEqual(MOCK_UPDATE_CEDENTE.email);
      expect(result.id).toBeDefined();
      expect(result.id).toEqual(MOCK_NOVO_CEDENTE.id);
      expect(result.name).toBeDefined();
      expect(result.name).toEqual('Chiquinho');
    });

    it('Deve deletar um cedente', async () => {
      jest.spyOn(controller, 'deleteAssignor').mockResolvedValue(true);

      await controller.deleteAssignor(MOCK_NOVO_CEDENTE.id);

      expect(controller.deleteAssignor).toBeCalled();
    });
  });
});
