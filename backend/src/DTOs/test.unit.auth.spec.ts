import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepo } from '../repositories/payable-repo';
import { prismaPayableRepo } from '../repositories/prisma/prisma-payable-repo';
import { prismaAssignorRepo } from '../repositories/prisma/prisma-assignor-repo';
import { AssignorRepo } from '../repositories/assignor-repo';
import { prismaUserRepo } from '../repositories/prisma/prisma-user-repo';
import { PrismaService } from '../database/prisma.service';
import { AppController } from '../app.controller';
import { UserRepo } from '../repositories/user-repo';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth-service';

describe('Cedente', () => {
  let controller: AppController;
  let service: AuthService;

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
    service = module.get<AuthService>(AuthService);
  });

  describe('Autenticação', () => {
    it('Deve conseguir logar', async () => {
      jest.spyOn(service, 'authenticate');

      const login = {
        login: 'teste',
        password: 'XXXXX',
      };
      await controller.createUser(login);

      const { token } = await controller.auth(login);

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
  });
});
