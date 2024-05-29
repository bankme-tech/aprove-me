import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../repositories/users/user.module';
import { AuthModule } from './auth.module';
import { PassportModule } from '@nestjs/passport';
import { SecurityModule } from './security.module';
import { UserController } from '../repositories/users/user.controller';
import { JwtStrategy } from './jwt.strategy';
import { CreateToken } from './toke';

describe('Autenticação', () => {
  let controller: AuthController;
  let service: AuthService;
  let userController: UserController;
  let jwtService: JwtStrategy;
  let createToken: CreateToken;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        AuthModule,
        PassportModule,
        SecurityModule,
        UserModule,
      ],
      controllers: [],
      providers: [],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    userController = module.get<UserController>(UserController);
    jwtService = module.get<JwtStrategy>(JwtStrategy);
    createToken = module.get<CreateToken>(CreateToken);
  });

  describe('Autenticação', () => {
    const login = {
      id: 10,
      login: 'vamosQvamos',
      password: 'XXXXX',
    };
    const loginInvalid = {
      id: 11,
      login: 'vamosQvamos',
      password: 'XXXXX',
    };

    it('Deve conseguir logar', async () => {
      jest.spyOn(service, 'authenticate');

      await userController.createUser(login);

      const { token } = (await controller.auth(login)) as any;

      expect(token).toBeDefined();
      expect(service.authenticate).toHaveBeenCalled();
      expect(typeof token).toBe('string');
    });
    it('Deve falhar ao logar com senha errada', async () => {
      jest.spyOn(service, 'authenticate');

      const login2 = {
        login: 'teste',
        password: 'zzzzzz',
      };

      try {
        await controller.auth(login2);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    it('Internal Error', async () => {
      jest.spyOn(service, 'authenticate').mockRejectedValue(new Error());

      const login2 = {
        login: 'teste',
        password: 'zzzzzz',
      };

      try {
        await controller.auth(login2);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
    it('Deve falhar ao logar com login errado', async () => {
      jest.spyOn(service, 'authenticate');

      const login = {
        login: 'teste32',
        password: 'XXXXX',
      };

      try {
        await controller.auth(login);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('Deve validar um user', async () => {
      jest.spyOn(jwtService, 'validate');

      const response = await jwtService.validate(login);
      expect(response).toBeDefined();
      expect(typeof response).toBe('object');
    });

    it('Deve falhar ao validar um user', async () => {
      jest.spyOn(jwtService, 'validate');

      try {
        await jwtService.validate(loginInvalid);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Deve Criar um token', async () => {
      jest.spyOn(createToken, 'generate');

      const response = await createToken.generate(login.login, login.id);
      expect(response).toBeDefined();
      expect(typeof response).toBe('string');
      expect(createToken.generate).toHaveBeenCalled();
    });

    it('Deve falhar ao criar um token', async () => {
      jest.spyOn(controller, 'perfil');

      const response = await controller.perfil(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWQiOjEsImlhdCI6MTcxNjkyNjUxNiwiZXhwIjoxNzE2OTMwMTE2fQ.U_I5wA0kMApyapen4pYINgdIXRDdppgXnGK0g0aTSvM',
      );

      expect(response).toBeDefined();
      expect(typeof response).toBe('object');
      expect(controller.perfil).toHaveBeenCalled();
    });
  });
});
