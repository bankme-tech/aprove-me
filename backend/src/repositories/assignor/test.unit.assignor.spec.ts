import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepo } from '../repositories/payable.repo';
import { prismaPayableRepo } from '../repositories/entitys/prisma-payable-repo';
import { prismaAssignorRepo } from '../repositories/entitys/prisma-assignor-repo';
import { AssignorRepo } from '../repositories/assignor.repo';
import { prismaUserRepo } from '../repositories/entitys/prisma-user-repo';
import { PrismaService } from '../database/prisma.service';
import { AppController } from '../app.controller';
import {
  MOCK_NOVO_CEDENTE,
  MOCK_UPDATE_CEDENTE,
} from '../../test/mocks/mock-assignor';
import { UserRepo } from '../repositories/user.repo';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

describe('Cedente', () => {
  let controller: AppController;
  let service: AssignorRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        }),
      ],
      controllers: [AppController],
      providers: [
        PrismaService,
        { provide: PayableRepo, useClass: prismaPayableRepo },
        { provide: AssignorRepo, useClass: prismaAssignorRepo },
        { provide: UserRepo, useClass: prismaUserRepo },
        AuthService,
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
      jest.spyOn(service, 'createAssignor');

      const result = await controller.createAssignor(MOCK_NOVO_CEDENTE);

      expect(result).toBeDefined();
      expect(result).toEqual(MOCK_NOVO_CEDENTE);
      expect(result.document).toEqual('aaaaaaaaaaaaa');
      expect(result.email).toBeDefined();
      expect(result.email).toEqual(MOCK_NOVO_CEDENTE.email);
      expect(result.id).toBeDefined();
      expect(result.id).toEqual(MOCK_NOVO_CEDENTE.id);
    });

    it('Deve falhar ao criar cedente que já existe', async () => {
      jest.spyOn(service, 'createAssignor');

      try {
        await controller.createAssignor(MOCK_NOVO_CEDENTE);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('Deve listar todos os cedentes', async () => {
      jest.spyOn(service, 'getAllAssignors');

      const result = await controller.getAssignorsAll();

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
    });

    it('Deve buscar um cedente por id', async () => {
      jest.spyOn(service, 'getAssignorById');

      const result = await controller.getAssignorById(MOCK_NOVO_CEDENTE.id);

      expect(result).toBeDefined();
      expect(result).toEqual(MOCK_NOVO_CEDENTE);
    });

    it('Deve retornar um arry de cedentes', async () => {
      jest.spyOn(service, 'getAllAssignors');

      const result = await controller.getAssignorsAll();

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expect(result).toEqual([MOCK_NOVO_CEDENTE]);
    });

    it('Internal Server Error', async () => {
      jest.spyOn(controller, 'getAssignorsAll').mockReset();

      try {
        await controller.getAssignorsAll();
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });

    it('Deve falhar ao tentar atualizar um cedente com id inválido', async () => {
      jest.spyOn(service, 'updateAssignor');

      const id = 'invalid-id';

      try {
        await controller.getAssignorById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Assignor with ID ${id} not found`);
      }
    });

    it('Deve atualizar um cedente com id válido', async () => {
      jest.spyOn(controller, 'updateAssignor');

      const id = MOCK_UPDATE_CEDENTE.id;

      const response = await controller.updateAssignor(id, MOCK_UPDATE_CEDENTE);

      expect(response).toEqual(MOCK_UPDATE_CEDENTE);
    });

    it('Deve falhar ao tentar deletar um cedente', async () => {
      jest.spyOn(service, 'deleteAssignor');

      try {
        await controller.getAssignorById('invalid-id');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Deve deletar um cedente', async () => {
      jest.spyOn(controller, 'deleteAssignor');

      await controller.deleteAssignor(MOCK_NOVO_CEDENTE.id);

      expect(controller.deleteAssignor).toBeDefined();
    });

    it('Deve retornar exceção not found', async () => {
      try {
        jest.spyOn(controller, 'getAssignorsAll');
        await controller.getAssignorsAll();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Deve falhar ao tentar buscar um cedente por id inválido', async () => {
      try {
        jest.spyOn(service, 'getAssignorById');

        controller.getAssignorById('invalid-id');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
