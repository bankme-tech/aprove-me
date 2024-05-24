import { Test, TestingModule } from '@nestjs/testing';
import { UserRepo } from './repositories/user-repo';
import { PayableRepo } from './repositories/payable-repo';
import { prismaPayableRepo } from './repositories/prisma/prisma-payable-repo';
import { prismaAssignorRepo } from './repositories/prisma/prisma-assignor-repo';
import { AssignorRepo } from './repositories/assignor-repo';
import { prismaUserRepo } from './repositories/prisma/prisma-user-repo';
import { PrismaService } from './database/prisma.service';
import {
  MOCK_NOVO_USUARIO,
  MOCK_NOVO_USUARIO_SEM_SENHA,
  MOCK_UPDATE_USUARIO,
} from '../test/mocks/mock-usuários';
import { AppController } from './app.controller';
import { BadRequestException } from '@nestjs/common';

describe('Usuário', () => {
  let controller: AppController;
  let service: UserRepo;

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
    service = module.get<UserRepo>(UserRepo);
  });

  it('Deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('Crianção de usuário', () => {
    it('Deve criar um novo usuário', async () => {
      jest.spyOn(controller, 'createUser').mockResolvedValue(MOCK_NOVO_USUARIO);

      const result = await controller.createUser(MOCK_NOVO_USUARIO);

      expect(result).toEqual(MOCK_NOVO_USUARIO);
      expect(result.password).toBeDefined();
      expect(result.password).toEqual(MOCK_NOVO_USUARIO.password);
      expect(result.login).toBeDefined();
      expect(result.login).toEqual(MOCK_NOVO_USUARIO.login);
      expect(result.id).toBeDefined();
      expect(result.id).toEqual(MOCK_NOVO_USUARIO.id);
    });

    it('Deve falhar ao tentar criar um novo usuário sem senha', async () => {
      jest.spyOn(controller, 'createUser');

      await expect(
        controller.createUser(MOCK_NOVO_USUARIO_SEM_SENHA),
      ).rejects.toThrow(BadRequestException);
      expect(controller.createUser).toHaveBeenCalled();
    });

    it('Deve obter um usuário pelo id', async () => {
      jest
        .spyOn(controller, 'getUserById')
        .mockResolvedValue(MOCK_NOVO_USUARIO);

      const result = await controller.getUserById(MOCK_NOVO_USUARIO.id);

      expect(result).toEqual(MOCK_NOVO_USUARIO);
      expect(result.password).toBeDefined();
      expect(result.password).toEqual(MOCK_NOVO_USUARIO.password);
      expect(result.login).toBeDefined();
      expect(result.login).toEqual(MOCK_NOVO_USUARIO.login);
      expect(result.id).toBeDefined();
      expect(result.id).toEqual(MOCK_NOVO_USUARIO.id);
    });

    it('Deve obter um usuário pelo login', async () => {
      jest
        .spyOn(controller, 'getUserByLogin')
        .mockResolvedValue(MOCK_NOVO_USUARIO);

      const result = await controller.getUserByLogin(MOCK_NOVO_USUARIO.login);

      expect(result).toEqual(MOCK_NOVO_USUARIO);
      expect(result.password).toBeDefined();
      expect(result.password).toEqual(MOCK_NOVO_USUARIO.password);
      expect(result.login).toBeDefined();
      expect(result.login).toEqual(MOCK_NOVO_USUARIO.login);
      expect(result.id).toBeDefined();
      expect(result.id).toEqual(MOCK_NOVO_USUARIO.id);
    });

    it('Deve obter um array usuário', async () => {
      jest.spyOn(controller, 'getUserAll');

      const result = await controller.getUserAll();

      expect(result).toBeInstanceOf(Array);
    });

    it('Deve atualizar um usuário', async () => {
      jest
        .spyOn(controller, 'updateUser')
        .mockResolvedValue(MOCK_UPDATE_USUARIO);

      const { id } = MOCK_NOVO_USUARIO;

      const result = await controller.updateUser(id, MOCK_NOVO_USUARIO);

      expect(result).toEqual(MOCK_UPDATE_USUARIO);
      expect(result.password).toBeDefined();
      expect(result.password).toEqual(MOCK_UPDATE_USUARIO.password);
      expect(result.login).toBeDefined();
      expect(result.login).toEqual('teste2');
      expect(result.id).toBeDefined();
      expect(result.id).toEqual(MOCK_UPDATE_USUARIO.id);
    });

    it('Deve deletar um usuário', async () => {
      jest.spyOn(controller, 'deleteUser').mockResolvedValue(null);

      const result = await controller.deleteUser(MOCK_NOVO_USUARIO.id);

      expect(result).toEqual(null);
    });
  });
});
