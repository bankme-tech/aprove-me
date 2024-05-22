import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../prisma.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

describe('AssignorService', () => {
  let service: AssignorService;
  let prismaService: PrismaService;
  const mock = {
    document: '111.222.333-44',
    email: 'carlos.santos@example.com',
    phone: '(31) 99876-5432',
    name: 'Carlos Santos',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorService,
        {
          provide: PrismaService,
          useValue: {
            assignor: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call prisma.assignor.create with correct data', async () => {
      const dto: CreateAssignorDto = mock;
      await service.create(dto);
      expect(prismaService.assignor.create).toHaveBeenCalledWith({
        data: {
          document: dto.document,
          email: dto.email,
          phone: dto.phone,
          name: dto.name,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should call prisma.assignor.findMany', async () => {
      await service.findAll();
      expect(prismaService.assignor.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call prisma.assignor.findUnique with correct id', async () => {
      const id = 'someId';
      await service.findOne(id);
      expect(prismaService.assignor.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should call prisma.assignor.update with correct data', async () => {
      const id = 'someId';
      const dto: UpdateAssignorDto = mock;
      await service.update(id, dto);
      expect(prismaService.assignor.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          document: dto.document,
          email: dto.email,
          phone: dto.phone,
          name: dto.name,
        },
      });
    });
  });

  describe('remove', () => {
    it('should call prisma.assignor.delete with correct id', async () => {
      const id = 'someId';
      await service.remove(id);
      expect(prismaService.assignor.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
