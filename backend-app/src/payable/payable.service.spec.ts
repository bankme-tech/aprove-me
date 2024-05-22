import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import { PrismaService } from '../prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

describe('PayableService', () => {
  let service: PayableService;
  let prismaService: PrismaService;

  const mock = {
    value: 1000,
    assignor: '09258e88-e727-4d4c-9373-36ea98b61d29',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        {
          provide: PrismaService,
          useValue: {
            payable: {
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

    service = module.get<PayableService>(PayableService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call prisma.payable.create with correct data', async () => {
      const dto: CreatePayableDto = mock;
      await service.create(dto);
      expect(prismaService.payable.create).toHaveBeenCalledWith({
        data: {
          value: dto.value,
          assignorId: dto.assignor,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should call prisma.Payable.findMany', async () => {
      await service.findAll();
      expect(prismaService.payable.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call prisma.Payable.findUnique with correct id', async () => {
      const id = 'someId';
      await service.findOne(id);
      expect(prismaService.payable.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should call prisma.Payable.update with correct data', async () => {
      const id = 'someId';
      const dto: UpdatePayableDto = mock;
      await service.update(id, dto);
      expect(prismaService.payable.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          value: dto.value,
          assignorId: dto.assignor,
        },
      });
    });
  });

  describe('remove', () => {
    it('should call prisma.Payable.delete with correct id', async () => {
      const id = 'someId';
      await service.remove(id);
      expect(prismaService.payable.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
