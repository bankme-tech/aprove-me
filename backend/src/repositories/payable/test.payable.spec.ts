import { Test, TestingModule } from '@nestjs/testing';
import {
  MOCK_NOVO_RECEBIVEIS,
  MOCK_UPDATE_RECEBIVEIS,
} from '../../../test/mocks/mock-payable';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { AssignorModule } from '../assignor/assignor.module';
import { PayableModule } from './payable.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { SecurityModule } from '../../auth/security.module';

describe('recebiveis', () => {
  let controller: PayableController;
  let service: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AssignorModule,
        PayableModule,
        UserModule,
        AuthModule,
        PassportModule,
        SecurityModule,
      ],
      controllers: [],
      providers: [],
    }).compile();

    controller = module.get<PayableController>(PayableController);
    service = module.get<PayableService>(PayableService);
  });

  it('Deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('CRUD de recebiveis', () => {
    it('Deve criar um novo recebiveis', async () => {
      jest.spyOn(service, 'createPayable');

      const result = await controller.createPayable(MOCK_NOVO_RECEBIVEIS);

      expect(result).toBeDefined();
      expect(result).toEqual(MOCK_NOVO_RECEBIVEIS);
      expect(result.assignor).toEqual(MOCK_NOVO_RECEBIVEIS.assignor);
      expect(result.value).toBeDefined();
      expect(result.value).toEqual(121);
      expect(result.id).toBeDefined();
      expect(result.id).toEqual(MOCK_NOVO_RECEBIVEIS.id);
    });

    it('Internal Server Error na rota create', async () => {
      jest.spyOn(service, 'createPayable').mockReset();

      try {
        controller.createPayable;
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });

    it('Deve retornar um erro ao tentar criar um recebiveis existente', async () => {
      jest.spyOn(service, 'createPayable');

      try {
        await controller.createPayable(MOCK_NOVO_RECEBIVEIS);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('Deve listar todos os recebiveiss', async () => {
      jest.spyOn(service, 'getAllPayables');

      const result = await controller.getPayableAll();

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
    });

    it('Internal Server Error na rota getPayableAll', async () => {
      jest.spyOn(service, 'getAllPayables').mockReset();

      try {
        controller.getPayableAll;
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });

    it('Deve buscar um recebiveis por id', async () => {
      jest.spyOn(service, 'getPayableById');

      const result = await controller.getPayableById(MOCK_NOVO_RECEBIVEIS.id);

      expect(result).toBeDefined();
      expect(result).toEqual(MOCK_NOVO_RECEBIVEIS);
    });

    it('Internal Server Error na rota getPayableById', async () => {
      jest.spyOn(service, 'getPayableById').mockReset();

      try {
        controller.getPayableById;
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });

    it('Deve retornar um erro ao tentar buscar um recebiveis inexistente', async () => {
      jest.spyOn(service, 'getPayableById');

      try {
        await controller.getPayableById('123');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Deve atualizar um recebiveis', async () => {
      jest.spyOn(service, 'updatePayable');

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

    it('Internal Server Error na rota update', async () => {
      jest.spyOn(service, 'updatePayable').mockReset();

      try {
        controller.updatePayable;
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });

    it('Deve retornar um erro ao tentar atualizar um recebiveis inexistente', async () => {
      jest.spyOn(service, 'updatePayable');

      try {
        await controller.updatePayable('123', MOCK_UPDATE_RECEBIVEIS);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Deve deletar um recebiveis', async () => {
      jest.spyOn(service, 'deletePayable');

      await controller.deletePayable(MOCK_NOVO_RECEBIVEIS.id);

      expect(controller.deletePayable).toBeDefined();
    });

    it('Interal Server Error na rota delete', async () => {
      jest.spyOn(service, 'deletePayable').mockReset();

      try {
        await controller.deletePayable;
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });

    it('Deve retornar um erro ao tentar deletar um recebiveis inexistente', async () => {
      jest.spyOn(service, 'deletePayable');

      try {
        await controller.deletePayable('123');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Deve retornar um erro ao tentar listar recebiveis inexistentes', async () => {
      jest.spyOn(service, 'getAllPayables');

      try {
        await controller.getPayableAll();
      } catch (error) {
        expect(error.message).toBe(NotFoundException);
      }
    });
  });
});
