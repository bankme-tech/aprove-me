import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepo } from '../repositories/payable-repo';
import { prismaPayableRepo } from '../repositories/prisma/prisma-payable-repo';
import { prismaAssignorRepo } from '../repositories/prisma/prisma-assignor-repo';
import { AssignorRepo } from '../repositories/assignor-repo';
import { prismaUserRepo } from '../repositories/prisma/prisma-user-repo';
import { PrismaService } from '../database/prisma.service';
import { AppController } from '../app.controller';
import {
  MOCK_NOVO_CEDENTE,
  MOCK_UPDATE_CEDENTE,
} from '../../test/mocks/mock-assignor';
import { UserRepo } from '../repositories/user-repo';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth-service';

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
  });
});
