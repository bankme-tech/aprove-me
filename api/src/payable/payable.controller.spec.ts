import { PrismaService } from '../db/prisma.service';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';

jest.mock('./payable.controller');

describe('PayableController', () => {
  let mockPayableController: jest.Mocked<PayableController>;

  beforeEach(() => {
    mockPayableController = new PayableController(
      new PayableService(new PrismaService()),
    ) as jest.Mocked<PayableController>;
  });

  describe('createPayable', () => {
    it('should create a payable', async () => {
      // Arrange
      const mockData = {
        value: 100,
        assignor: '123e456-12b3-a456-426614174000',
      };

      const expectedResult = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        value: 100,
        assignor: '123e456-12b3-a456-426614174000',
        emissionDate: new Date('2021-09-01'),
      };

      mockPayableController.create.mockResolvedValue(expectedResult);

      // Act
      const result = await mockPayableController.create(mockData);

      // Assert
      expect(mockPayableController.create).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if assignor does not exist', async () => {
      // Arrange
      const mockData = {
        value: 100,
        assignor: '123e456-12b3-a456-426614174000',
      };

      const expectedResult = 'Assignor not found';

      mockPayableController.create.mockRejectedValue(new Error(expectedResult));
      // Act
      try {
        await mockPayableController.create(mockData);
      } catch (error) {
        // Assert
        expect(error.message).toBe(expectedResult);
      }

      expect(mockPayableController.create).toHaveBeenCalledWith(mockData);
    });

    it('should throw an error if validation fails', async () => {
      // Arrange
      const mockData = {
        value: '100',
        assignor: '123e456-12b3-a456-426614174000',
      };

      const expectedResult = [
        'value has wrong value 100, must be a number string',
      ];

      mockPayableController.create.mockRejectedValue(
        new Error(expectedResult.join(', ')),
      );

      // Act
      try {
        await mockPayableController.create(mockData as any);
      } catch (error) {
        // Assert
        expect(error.message).toBe(expectedResult.join(', '));
      }

      expect(mockPayableController.create).toHaveBeenCalledWith(mockData);
    });
  });

  describe('findAllPayables', () => {
    it('should return all payables', async () => {
      // Arrange
      const expectedResult = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          value: 100,
          assignor: '123e456-12b3-a456-426614174000',
          emissionDate: new Date('2021-09-01'),
        },
      ];

      mockPayableController.findAll.mockResolvedValue(expectedResult);

      // Act
      const result = await mockPayableController.findAll();

      // Assert
      expect(mockPayableController.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should return an empty array if there are no payables', async () => {
      // Arrange
      const expectedResult = [];

      mockPayableController.findAll.mockResolvedValue(expectedResult);

      // Act
      const result = await mockPayableController.findAll();

      // Assert
      expect(mockPayableController.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findPayableById', () => {
    it('should return a payable by id', async () => {
      // Arrange
      const mockId = '123e4567-e89b-12d3-a456-426614174000';

      const expectedResult = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        value: 100,
        assignor: '123e456-12b3-a456-426614174000',
        emissionDate: new Date('2021-09-01'),
      };

      mockPayableController.findOne.mockResolvedValue(expectedResult);

      // Act
      const result = await mockPayableController.findOne(mockId);

      // Assert
      expect(mockPayableController.findOne).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if payable does not exist', async () => {
      // Arrange
      const mockId = '123e4567-e89b-12d3-a456-426614174015';

      const expectedResult = 'Payable not found';

      mockPayableController.findOne.mockRejectedValue(
        new Error(expectedResult),
      );

      // Act
      try {
        await mockPayableController.findOne(mockId);
      } catch (error) {
        // Assert
        expect(error.message).toBe(expectedResult);
      }

      expect(mockPayableController.findOne).toHaveBeenCalledWith(mockId);
    });
  });

  describe('updatePayable', () => {
    it('should update a payable', async () => {
      // Arrange
      const mockId = '123e4567-e89b-12d3-a456-426614174000';

      const mockData = {
        value: 200,
        assignor: '123e456-12b3-a456-426614174555',
      };

      const expectedResult = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        value: 200,
        assignor: '123e456-12b3-a456-426614174555',
        emissionDate: new Date('2021-09-01'),
      };

      mockPayableController.update.mockResolvedValue(expectedResult);

      // Act
      const result = await mockPayableController.update(mockId, mockData);

      // Assert
      expect(mockPayableController.update).toHaveBeenCalledWith(
        mockId,
        mockData,
      );
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if payable does not exist', async () => {
      // Arrange
      const mockId = '123e4567-e89b-12d3-a456-426614174015';

      const mockData = {
        value: 200,
        assignor: '123e456-12b3-a456-426614174555',
      };

      const expectedResult = 'Payable not found';

      mockPayableController.update.mockRejectedValue(new Error(expectedResult));

      // Act
      try {
        await mockPayableController.update(mockId, mockData);
      } catch (error) {
        // Assert
        expect(error.message).toBe(expectedResult);
      }

      expect(mockPayableController.update).toHaveBeenCalledWith(
        mockId,
        mockData,
      );
    });

    it('should throw an error if validation fails', async () => {
      // Arrange
      const mockId = '123e4567-e89b-12d3-a456-426614174000';

      const mockData = {
        value: '200',
        assignor: '123e456-12b3-a456-426614174555',
      };

      const expectedResult = [
        'value has wrong value 200, must be a number string',
      ];

      mockPayableController.update.mockRejectedValue(
        new Error(expectedResult.join(', ')),
      );

      // Act
      try {
        await mockPayableController.update(mockId, mockData as any);
      } catch (error) {
        // Assert
        expect(error.message).toBe(expectedResult.join(', '));
      }

      expect(mockPayableController.update).toHaveBeenCalledWith(
        mockId,
        mockData,
      );
    });
  });

  describe('deletePayable', () => {
    it('should delete a payable', async () => {
      // Arrange
      const mockId = '123e4567-e89b-12d3-a456-426614174000';
      mockPayableController.remove.mockResolvedValue(undefined);

      // Act
      await mockPayableController.remove(mockId);

      // Assert
      expect(mockPayableController.remove).toHaveBeenCalledWith(mockId);
    });
  });
});
