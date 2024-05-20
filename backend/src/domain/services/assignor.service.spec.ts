import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { PrismaAssignorRepository } from '../../infrastructure/repositories/prisma-assignor.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AssignorService', () => {
  let assignorService: AssignorService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        AssignorService,
        {
          provide: 'AssignorRepository',
          useClass: PrismaAssignorRepository,
        },
      ],
    }).compile();

    assignorService = moduleFixture.get<AssignorService>(AssignorService);
    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(assignorService).toBeDefined();
  });

  it('should create a new user and show it', async () => {
    prisma.assignor.create = jest.fn().mockResolvedValue({
      id: '9f59c891-2a20-4256-bc55-14a4720d5c42',
      document: '474.027.730-19',
      email: 'juaozim.dugrau@teste.com',
      phone: '(67) 96985-3014',
      name: 'Juãozim du Grau',
    });

    const assignor = await assignorService.createAssignor({
      document: '474.027.730-19',
      email: 'juaozim.dugrau@teste.com',
      phone: '(67) 96985-3014',
      name: 'Juãozim du Grau',
    });

    expect(assignor).toMatchObject({
      id: '9f59c891-2a20-4256-bc55-14a4720d5c42',
      document: '474.027.730-19',
      email: 'juaozim.dugrau@teste.com',
      phone: '(67) 96985-3014',
      name: 'Juãozim du Grau',
    });
  });

  it('should throw error when sending invalid object', async () => {
    prisma.assignor.create = jest
      .fn()
      .mockResolvedValueOnce({
        id: '9f59c891-2a20-4256-bc55-14a4720d5c42',
        document: '474.027.730-19',
        email: 'juaozim.dugrau@teste.com',
        phone: '(67) 96985-3014',
        name: 'Juãozim du Grau',
      })
      .mockRejectedValueOnce(
        new HttpException(
          'Unique constraint failed on the fields: (`document`)',
          HttpStatus.BAD_REQUEST,
        ),
      );

    await assignorService.createAssignor({
      document: '474.027.730-19',
      email: 'juaozim.dugrau@teste.com',
      phone: '(67) 96985-3014',
      name: 'Juãozim du Grau',
    });

    await expect(
      assignorService.createAssignor({
        document: '474.027.730-19',
        email: 'juaozim.dugrau@teste.com',
        phone: '(67) 96985-3014',
        name: 'Juãozim du Grau',
      }),
    ).rejects.toThrow('Unique constraint failed on the fields: (`document`)');
  });

  it('should update a user', async () => {
    const updatedAssignor = {
      id: '9f59c891-2a20-4256-bc55-14a4720d5c42',
      document: '474.027.730-19',
      email: 'juaozim.dugrau@teste.com',
      phone: '(67) 96985-3014',
      name: 'Juãozim du Grau Atualizado',
    };

    prisma.assignor.update = jest.fn().mockResolvedValue(updatedAssignor);

    const result = await assignorService.update(
      '9f59c891-2a20-4256-bc55-14a4720d5c42',
      updatedAssignor,
    );

    expect(result).toMatchObject(updatedAssignor);
    expect(prisma.assignor.update).toHaveBeenCalledWith({
      where: { id: '9f59c891-2a20-4256-bc55-14a4720d5c42' },
      data: updatedAssignor,
    });
  });

  it('should delete a user', async () => {
    prisma.assignor.delete = jest.fn().mockResolvedValue(undefined);
    await assignorService.delete('9f59c891-2a20-4256-bc55-14a4720d5c42');
    expect(prisma.assignor.delete).toHaveBeenCalled();
  });
});
