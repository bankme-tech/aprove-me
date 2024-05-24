import { Test, TestingModule } from '@nestjs/testing';
import { AssignorsController } from './assignors.controller';
import { AssignorsService } from './assignors.service';
import { PrismaService } from '../../prisma.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { AssignorEntity } from './entities/assignor.entity';

describe('AssignorsController', () => {
  let controller: AssignorsController;
  let service: AssignorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorsController],
      providers: [
        AssignorsService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: AssignorsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AssignorsController>(AssignorsController);
    service = module.get<AssignorsService>(AssignorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with the correct data', async () => {
      const createAssignorDto = new CreateAssignorDto();
      const assignorEntity = new AssignorEntity({
        id: '1',
        name: 'Assignor A',
      });
      jest.spyOn(service, 'create').mockResolvedValue(assignorEntity);

      const result = await controller.create(createAssignorDto);
      expect(service.create).toHaveBeenCalledWith(createAssignorDto);
      expect(result).toEqual(new AssignorEntity(assignorEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of AssignorEntity', async () => {
      const assignorEntity = new AssignorEntity({
        id: '1',
        name: 'Assignor A',
      });
      jest.spyOn(service, 'findAll').mockResolvedValue([assignorEntity]);

      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([new AssignorEntity(assignorEntity)]);
    });
  });

  describe('findOne', () => {
    it('should return a single AssignorEntity', async () => {
      const id = '1';
      const assignorEntity = new AssignorEntity({ id, name: 'Assignor A' });
      jest.spyOn(service, 'findOne').mockResolvedValue(assignorEntity);

      const result = await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(new AssignorEntity(assignorEntity));
    });
  });

  describe('update', () => {
    it('should update and return the updated AssignorEntity', async () => {
      const id = '1';
      const updateAssignorDto = new UpdateAssignorDto();
      const assignorEntity = new AssignorEntity({
        id,
        name: 'Updated Assignor',
      });
      jest.spyOn(service, 'update').mockResolvedValue(assignorEntity);

      const result = await controller.update(id, updateAssignorDto);
      expect(service.update).toHaveBeenCalledWith(id, updateAssignorDto);
      expect(result).toEqual(new AssignorEntity(assignorEntity));
    });
  });

  describe('remove', () => {
    it('should remove and return the removed AssignorEntity', async () => {
      const id = '1';
      const assignorEntity = new AssignorEntity({ id, name: 'Assignor A' });
      jest.spyOn(service, 'remove').mockResolvedValue(assignorEntity);

      const result = await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(new AssignorEntity(assignorEntity));
    });
  });
});
