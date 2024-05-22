/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.config';
import { AssignorRepository } from 'src/repositories/assignor.repository';
import { PrismaAssignorRepository } from './prisma.assignor.repository';

describe('PrismaAssignorRepository', () => {
  let repository: PrismaAssignorRepository;
  let prismaService: PrismaService;

  const mockPrismaService = {
    assignor: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaAssignorRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<PrismaAssignorRepository>(PrismaAssignorRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create an assignor', async () => {
    const assignorData: AssignorRepository.bodyType = {
      document: '12345678901',
      email: 'test@example.com',
      phone: '1234567890',
      name: 'Test Assignor',
    };

    mockPrismaService.assignor.create.mockResolvedValue(assignorData);

    const result = await repository.create_assignor(assignorData);
    expect(result.isError()).toBe(false);
    expect(result.value).toEqual(assignorData);
  });

  it('should get an assignor by id', async () => {
    const assignorData = {
      id: '1',
      document: '12345678901',
      email: 'test@example.com',
      phone: '1234567890',
      name: 'Test Assignor',
    };

    mockPrismaService.assignor.findUnique.mockResolvedValue(assignorData);

    const result = await repository.get_assignor('1');
    expect(result.isError()).toBe(false);
    expect(result.value).toEqual(assignorData);
  });

  it('should return error if assignor not found by id', async () => {
    mockPrismaService.assignor.findUnique.mockResolvedValue(null);

    const result = await repository.get_assignor('1');
    expect(result.isError()).toBe(false);
    expect(result.value).toBeNull();
  });

  it('should get a list of assignors', async () => {
    const assignors = [
      { id: '1', document: '12345678901', email: 'test1@example.com', phone: '1234567890', name: 'Test Assignor 1' },
      { id: '2', document: '98765432109', email: 'test2@example.com', phone: '0987654321', name: 'Test Assignor 2' },
    ];

    mockPrismaService.assignor.findMany.mockResolvedValue(assignors);

    const result = await repository.get_list_assignor();
    expect(result.isError()).toBe(false);
    expect(result.value).toEqual(assignors);
  });

  it('should delete an assignor', async () => {
    mockPrismaService.assignor.delete.mockResolvedValue({});

    const result = await repository.delete_assignor('1');
    expect(result.isError()).toBe(false);
    expect(result.value).toBeUndefined();
  });

  it('should update an assignor', async () => {
    const assignorData = {
      id: '1',
      document: '12345678901',
      email: 'updated@example.com',
      phone: '1234567890',
      name: 'Updated Assignor',
    };

    mockPrismaService.assignor.update.mockResolvedValue(assignorData);

    const result = await repository.update_assignor('1', assignorData);
    expect(result.isError()).toBe(false);
    expect(result.value).toEqual(assignorData);
  });
});
