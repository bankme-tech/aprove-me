import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AssignorModule } from '../assignor/assignor.module';
import { PayableModule } from '../payable/payable.module';
import { UserModule } from './user.module';
import { AuthModule } from '../../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { SecurityModule } from '../../auth/security.module';
import {
  MOCK_NOVO_USUARIO,
  MOCK_NOVO_USUARIO_RESPONSE,
  MOCK_NOVO_USUARIO_SEM_SENHA,
  MOCK_UPDATE_USUARIO,
} from '../../../test/mocks/mock-usuários';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('Usuário', () => {
  let controller: UserController;
  let service: UserService;

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

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('Crianção de usuário', () => {
    it('Deve criar um novo usuário', async () => {
      jest.spyOn(service, 'createUser');

      const result = await controller.createUser(MOCK_NOVO_USUARIO);

      expect(result.login).toEqual(MOCK_NOVO_USUARIO.login);
      expect(result.id).toBeDefined();
    });

    it('Deve falhar ao tentar criar um novo usuário sem senha', async () => {
      jest.spyOn(service, 'createUser');
      try {
        await controller.createUser(MOCK_NOVO_USUARIO_SEM_SENHA);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('Deve falhar ao tentar registrar um usuário ja existente', async () => {
      jest.spyOn(service, 'createUser');

      try {
        await controller.createUser(MOCK_NOVO_USUARIO);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('Internal erro ao tentar criar um novo usuário', async () => {
      jest.spyOn(service, 'createUser').mockReset;

      try {
        await controller.createUser;
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });

    it('Deve obter um usuário pelo id', async () => {
      jest.spyOn(service, 'getUserById');

      const result = await controller.getUserById(MOCK_NOVO_USUARIO.id);

      expect(result.id).toEqual(MOCK_NOVO_USUARIO.id);
    });

    it('Deve falhar ao tentar obter um usuário pelo id', async () => {
      jest.spyOn(service, 'getUserById');

      try {
        await controller.getUserById(10);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Deve obter um usuário pelo login', async () => {
      jest.spyOn(service, 'getUserByLogin');

      const result = await controller.getUserByLogin(MOCK_NOVO_USUARIO.login);

      expect(result.login).toEqual(MOCK_NOVO_USUARIO.login);
      expect(result.id).toBeDefined();
    });

    it('Deve falhar ao tentar obter um usuário pelo login', async () => {
      jest.spyOn(service, 'getUserByLogin');

      try {
        await controller.getUserByLogin('teste2');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Deve obter um array usuário', async () => {
      jest.spyOn(service, 'getUsersAll');

      const result = await controller.getUserAll();

      expect(result).toBeInstanceOf(Array);
    });

    it('Deve atualizar um usuário', async () => {
      jest.spyOn(service, 'updateUser');

      const { id } = MOCK_NOVO_USUARIO;

      const result = await controller.updateUser(id, MOCK_UPDATE_USUARIO);

      expect(result.login).toBeDefined();
      expect(result.login).toEqual(MOCK_UPDATE_USUARIO.login);
      expect(result.id).toBeDefined();
      expect(result.id).toEqual(MOCK_UPDATE_USUARIO.id);
    });

    it('Deve falhar ao tentar atualizar um usuário com id inválido', async () => {
      jest.spyOn(service, 'updateUser');

      try {
        await controller.updateUser(10, MOCK_NOVO_USUARIO);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Deve falhar ao deletar um usuário com id inválido', async () => {
      jest.spyOn(service, 'deleteUser');

      try {
        await controller.deleteUser(10);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Deve deletar um usuário com id válido', async () => {
      jest.spyOn(service, 'deleteUser');

      const result = await controller.deleteUser(MOCK_NOVO_USUARIO_RESPONSE.id);

      expect(result).toBeUndefined();
    });
  });
});
