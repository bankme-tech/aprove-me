import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import AssignorDto from '../dto/AssignorDto';
import { assignorToCreationMock, assignorCreatedMock } from './mocks/mock';
import { JwtService } from '@nestjs/jwt';

describe('AssignorController', () => {
  let assignorController: AssignorController;
  let assignorService: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [
        {
          provide: AssignorService,
          useValue: {
            createAssignorRegister: jest
              .fn()
              .mockResolvedValue(assignorCreatedMock),
            findAssignorById: jest.fn().mockResolvedValue(assignorCreatedMock),
            updateAssignorById: jest.fn(),
            deleteAssignorById: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    assignorController = module.get<AssignorController>(AssignorController);
    assignorService = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(assignorController).toBeDefined();
    expect(assignorService).toBeDefined();
  });

  describe('createAssignorRegister', () => {
    it('should create a new assignor with success', async () => {
      const result = await assignorController.createAssignorRegister(
        assignorToCreationMock,
      );

      expect(result).toBeInstanceOf(AssignorDto);
      expect(assignorService.createAssignorRegister).toHaveBeenCalledWith(
        assignorToCreationMock.toEntity(),
      );
      expect(assignorService.createAssignorRegister).toHaveBeenCalledTimes(1);
      expect(assignorService.createAssignorRegister).toHaveReturned();
    });
  });

  describe('findAssignorById', () => {
    it('should find an assignor by id with success', async () => {
      const id = '123456789';

      const result = await assignorController.findAssignorById(id);

      expect(result).toBeInstanceOf(AssignorDto);
      expect(assignorService.findAssignorById).toHaveBeenCalledWith(id);
      expect(assignorService.findAssignorById).toHaveBeenCalledTimes(1);
      expect(assignorService.findAssignorById).toHaveReturned();
    });

    it('should throw an error when assignor is not found', async () => {
      const id = '123456789';

      jest
        .spyOn(assignorService, 'findAssignorById')
        .mockResolvedValueOnce(null);

      try {
        await assignorController.findAssignorById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Assignor not found');
      }
    });
  });

  describe('updateAssignorById', () => {
    it('should update an assignor by id with success', async () => {
      const id = '123456789';

      await assignorController.updateAssignorById(id, assignorToCreationMock);

      expect(assignorService.updateAssignorById).toHaveBeenCalledWith(
        id,
        assignorToCreationMock.toEntity(),
      );
      expect(assignorService.updateAssignorById).toHaveBeenCalledTimes(1);
      expect(assignorService.updateAssignorById).toHaveReturned();
    });

    it('should throw an error when assignor is not found', async () => {
      const id = '123456789';

      jest
        .spyOn(assignorService, 'updateAssignorById')
        .mockResolvedValueOnce(null);

      try {
        await assignorController.updateAssignorById(id, assignorToCreationMock);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Assignor not found');
      }
    });
  });

  describe('deleteAssignorById', () => {
    it('should delete an assignor by id with success', async () => {
      const id = '123456789';

      await assignorController.deleteAssignorById(id);

      expect(assignorService.deleteAssignorById).toHaveBeenCalledWith(id);
      expect(assignorService.deleteAssignorById).toHaveBeenCalledTimes(1);
      expect(assignorService.deleteAssignorById).toHaveReturned();
    });

    it('should throw an error when assignor is not found', async () => {
      const id = '123456789';

      jest
        .spyOn(assignorService, 'deleteAssignorById')
        .mockResolvedValueOnce(null);

      try {
        await assignorController.deleteAssignorById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Assignor not found');
      }
    });
  });
});
