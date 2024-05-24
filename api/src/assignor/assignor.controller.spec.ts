import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { Assignor } from './entities/assignor.entity';
import { BadRequestException } from '@nestjs/common';

const assignorEntityList = [
  new Assignor(
    '123e4567-e89b-12d3-a456-426614174000',
    '12345678901',
    'teste@teste.com',
    '31999999999',
    'Assignor 1',
  ),

  new Assignor(
    '123e4567-e89b-12d3-a456-426614174001',
    '12345678902',
    'teste2@teste.com',
    '31999999998',
    'Assignor 2',
  ),
];

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
            create: jest.fn().mockResolvedValue(assignorEntityList[0]),
            findAll: jest.fn().mockResolvedValue(assignorEntityList),
            findOne: jest.fn().mockResolvedValue(assignorEntityList[1]),
            update: jest.fn().mockResolvedValue(assignorEntityList[0]),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    assignorController = module.get<AssignorController>(AssignorController);
    assignorService = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(assignorController).toBeDefined();
  });

  describe('create', () => {
    it('should create an assignor', async () => {
      // Arrange
      const assignorInsert = {
        document: '12345678901',
        email: 'teste@teste.com',
        phone: '31999999999',
        name: 'Assignor 1',
      };

      // Act
      const result = await assignorController.create(assignorInsert);

      // Assert
      expect(result).toEqual(assignorEntityList[0]);
      expect(assignorService.create).toHaveBeenCalledWith(assignorInsert);
    });

    it('should throw an error if assignor already exists', async () => {
      // Arrange
      jest
        .spyOn(assignorService, 'create')
        .mockRejectedValueOnce(
          new BadRequestException('Assignor already exists'),
        );

      const assignorInsert = {
        document: '12345678901',
        email: 'teste@teste.com',
        phone: '31999999999',
        name: 'Assignor 1',
      };

      // Act
      try {
        await assignorController.create(assignorInsert);
      } catch (error) {
        // Assert
        expect(error.message).toBe('Assignor already exists');
      }
      expect(assignorService.create).toHaveBeenCalledWith(assignorInsert);
    });

    it('should throw an error if validation fails', async () => {
      // Arrange
      jest
        .spyOn(assignorService, 'create')
        .mockRejectedValueOnce(
          new BadRequestException('Assignor already exists'),
        );

      const assignorInsert = {
        document: '12345678901',
        email: 'teste@teste.com',
        phone: '31999999999',
        name: 'Assignor 1',
      };

      // Act
      try {
        await assignorController.create(assignorInsert);
      } catch (error) {
        // Assert
        expect(error.message).toBe('Assignor already exists');
      }
      expect(assignorService.create).toHaveBeenCalledWith(assignorInsert);
    });

    it('should throw an error if validation fails with not email', async () => {
      // Arrange
      jest
        .spyOn(assignorService, 'create')
        .mockRejectedValueOnce(
          new BadRequestException([
            'email has wrong value teste, email must be an email',
          ]),
        );

      const assignorInsert = {
        document: '12345678901',
        email: 'teste',
        phone: '31999999999',
        name: 'Assignor 1',
      };

      // Act
      try {
        await assignorController.create(assignorInsert);
      } catch (error) {
        // Assert
        expect(error.response.message[0]).toBe(
          'email has wrong value teste, email must be an email',
        );
      }
      expect(assignorService.create).toHaveBeenCalledWith(assignorInsert);
    });
  });

  describe('findAll', () => {
    it('should return a list of assignors', async () => {
      // Act
      const result = await assignorController.findAll();

      // Assert
      expect(result).toEqual(assignorEntityList);
    });
  });

  describe('findOne', () => {
    it('should return an assignor', async () => {
      // Act
      const result = await assignorController.findOne(
        '123e4567-e89b-12d3-a456-426614174001',
      );

      // Assert
      expect(result).toEqual(assignorEntityList[1]);
      expect(assignorService.findOne).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174001',
      );
    });

    it('should throw an error if assignor does not exist', async () => {
      // Arrange
      jest
        .spyOn(assignorService, 'findOne')
        .mockRejectedValueOnce(new Error('Assignor not found'));

      // Act
      try {
        await assignorController.findOne(
          '123e4567-e89b-12d3-a456-426614174001',
        );
      } catch (error) {
        // Assert
        expect(error.message).toBe('Assignor not found');
      }
      expect(assignorService.findOne).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174001',
      );
    });
  });

  describe('update', () => {
    it('should update an assignor', async () => {
      // Arrange
      const assignorUpdate = {
        document: '12345678901',
        email: 'teste@email.com',
      };

      // Act
      const result = await assignorController.update(
        '123e4567-e89b-12d3-a456-426614174001',
        assignorUpdate,
      );

      // Assert
      expect(result).toEqual(assignorEntityList[0]);
      expect(assignorService.update).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174001',
        assignorUpdate,
      );
    });

    it('should throw an error if assignor does not exist', async () => {
      // Arrange
      jest
        .spyOn(assignorService, 'update')
        .mockRejectedValueOnce(new Error('Assignor not found'));

      const assignorUpdate = {
        document: '12345678901',
        email: 'teste@email.com',
      };

      // Act
      try {
        await assignorController.update(
          '123e4567-e89b-12d3-a456-426614174001',
          assignorUpdate,
        );
      } catch (error) {
        // Assert
        expect(error.message).toBe('Assignor not found');
      }
      expect(assignorService.update).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174001',
        assignorUpdate,
      );
    });

    it('should throw an error if validation fails', async () => {
      // Arrange
      jest
        .spyOn(assignorService, 'update')
        .mockRejectedValueOnce(
          new BadRequestException('Assignor already exists'),
        );

      const assignorUpdate = {
        document: '12345678901',
        email: 'teste@email.com',
      };

      // Act
      try {
        await assignorController.update(
          '123e4567-e89b-12d3-a456-426614174001',
          assignorUpdate,
        );
      } catch (error) {
        // Assert
        expect(error.message).toBe('Assignor already exists');
      }
    });
  });

  describe('remove', () => {
    it('should remove an assignor', async () => {
      // Act
      const result = await assignorController.remove(
        '123e4567-e89b-12d3-a456-426614174001',
      );

      // Assert
      expect(result).toEqual({});
      expect(assignorService.remove).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174001',
      );
    });

    it('should throw an error if assignor does not exist', async () => {
      // Arrange
      jest
        .spyOn(assignorService, 'remove')
        .mockRejectedValueOnce(new Error('Assignor not found'));

      // Act
      try {
        await assignorController.remove('123e4567-e89b-12d3-a456-426614174001');
      } catch (error) {
        // Assert
        expect(error.message).toBe('Assignor not found');
      }
      expect(assignorService.remove).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174001',
      );
    });
  });
});
