import { Test, TestingModule } from '@nestjs/testing';
import { UserRepo } from './repositories/user-repo';
import { PayableRepo } from './repositories/payable-repo';
import { prismaPayableRepo } from './repositories/prisma/prisma-payable-repo';
import { prismaAssignorRepo } from './repositories/prisma/prisma-assignor-repo';
import { AssignorRepo } from './repositories/assignor-repo';
import { prismaUserRepo } from './repositories/prisma/prisma-user-repo';
import { PrismaService } from './database/prisma.service';
import { AppController } from './app.controller';
import { NotFoundException } from '@nestjs/common';

describe('Usuário', () => {
  let controller: AppController;

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
  });

  describe('Controller', () => {
    it('Deve retornar exceção not found', async () => {
      try {
        jest.spyOn(controller, 'getAssignorsAll').mockResolvedValue;
        await controller.getAssignorsAll();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
