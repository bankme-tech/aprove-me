import { Test, TestingModule } from '@nestjs/testing';
import { AssignorsService } from './assignors.service';
import { PrismaService } from '../../prisma.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

describe('AssignorsService', () => {
  let service: AssignorsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorsService,
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

    service = module.get<AssignorsService>(AssignorsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call prisma.assignor.create with correct data', async () => {
      const createAssignorDto = new CreateAssignorDto();
      const createSpy = jest
        .spyOn(prisma.assignor, 'create')
        .mockResolvedValue(Object.assign({ id: '1' }, createAssignorDto));

      await service.create(createAssignorDto);
      expect(createSpy).toHaveBeenCalledWith({ data: createAssignorDto });
    });
  });

  describe('findAll', () => {
    it('should call prisma.assignor.findMany', async () => {
      const findManySpy = jest
        .spyOn(prisma.assignor, 'findMany')
        .mockResolvedValue([]);

      await service.findAll();
      expect(findManySpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call prisma.assignor.findUnique with correct id', async () => {
      const id = '1';
      const assignor = {
        id,
        document: 'doc',
        email: 'email@test.com',
        phone: '123456789',
        name: 'Assignor A',
      };
      const findUniqueSpy = jest
        .spyOn(prisma.assignor, 'findUnique')
        .mockResolvedValue(assignor);

      await service.findOne(id);
      expect(findUniqueSpy).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('update', () => {
    it('should call prisma.assignor.update with correct data', async () => {
      const id = '1';
      const updateAssignorDto = new UpdateAssignorDto();
      const assignor = {
        id,
        document: 'updatedDoc',
        email: 'updatedEmail@test.com',
        phone: '987654321',
        name: 'Updated Assignor',
      };
      const updateSpy = jest
        .spyOn(prisma.assignor, 'update')
        .mockResolvedValue(assignor);

      await service.update(id, updateAssignorDto);
      expect(updateSpy).toHaveBeenCalledWith({
        where: { id },
        data: updateAssignorDto,
      });
    });
  });

  describe('remove', () => {
    it('should call prisma.assignor.delete with correct id', async () => {
      const id = '1';
      const assignor = {
        id,
        document: 'doc',
        email: 'email@test.com',
        phone: '123456789',
        name: 'Assignor A',
      };
      const deleteSpy = jest
        .spyOn(prisma.assignor, 'delete')
        .mockResolvedValue(assignor);

      await service.remove(id);
      expect(deleteSpy).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
