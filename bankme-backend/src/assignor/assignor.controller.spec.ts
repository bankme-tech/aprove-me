import { Test, TestingModule } from '@nestjs/testing';
import { CreateAssignorDto, UpdateAssignorDto } from './dto/assignor.dto';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';

describe('AssignorController', () => {
  let controller: AssignorController;
  let service: AssignorService;

  const mockService = {
    getAssignorById: jest.fn(),
    createAssignor: jest.fn(),
    updateAssignor: jest.fn(),
    deleteAssignor: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [
        {
          provide: AssignorService,
          useValue: mockService,
        },
      ],
    }).compile();

    service = moduleRef.get<AssignorService>(AssignorService);
    controller = moduleRef.get<AssignorController>(AssignorController);
  });

  describe('create', () => {
    test('should create and return an assignor', async () => {
      const assignor = {
        id: 'any-id',
        document: 'any-doc',
        email: 'any-email',
        name: 'any-name',
        phone: 'any-phone',
      };
      const dto: CreateAssignorDto = {
        document: assignor.document,
        email: assignor.email,
        name: assignor.name,
        phone: assignor.phone,
      };

      jest.spyOn(service, 'createAssignor').mockResolvedValueOnce(assignor);

      const result = await controller.create(dto);

      expect(service.createAssignor).toHaveBeenCalledWith(dto);
      expect(result).toEqual(assignor);
    });
  });

  describe('findOne', () => {
    test('should return an assignor if found', async () => {
      const assignor = {
        id: 'any-id',
        document: 'any-doc',
        email: 'any-email',
        name: 'any-name',
        phone: 'any-phone',
      };

      jest.spyOn(service, 'getAssignorById').mockResolvedValueOnce(assignor);

      const result = await controller.findOne(assignor.id);

      expect(service.getAssignorById).toHaveBeenCalledWith(assignor.id);
      expect(result).toEqual(assignor);
    });
  });

  describe('update', () => {
    test('should update and return the assignor', async () => {
      const assignor = {
        id: 'any-id',
        document: 'any-doc',
        email: 'any-email',
        name: 'any-name',
        phone: 'any-phone',
      };
      const dto: UpdateAssignorDto = {
        document: 'new-doc',
      };
      const updatedAssignor = {
        ...assignor,
        document: dto.document!,
      };

      jest
        .spyOn(service, 'updateAssignor')
        .mockResolvedValueOnce(updatedAssignor);

      const result = await controller.update(assignor.id, dto);

      expect(service.updateAssignor).toHaveBeenCalledWith(assignor.id, dto);
      expect(result).toEqual(updatedAssignor);
    });
  });

  describe('remove', () => {
    test('should delete the assignor', async () => {
      const id = 'any-id';

      jest.spyOn(service, 'deleteAssignor').mockResolvedValueOnce(undefined);

      await expect(controller.remove(id)).resolves.toBeUndefined();
      expect(service.deleteAssignor).toHaveBeenCalledWith(id);
    });
  });
});
