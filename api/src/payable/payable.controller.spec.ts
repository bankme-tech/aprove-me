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

      const result = await mockPayableController.create(mockData);

      expect(mockPayableController.create).toHaveBeenCalledWith(mockData);

      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if assignor does not exist', async () => {
      const mockData = {
        value: 100,
        assignor: '123e456-12b3-a456-426614174000',
      };

      const expectedResult = 'Assignor not found';

      mockPayableController.create.mockRejectedValue(new Error(expectedResult));

      try {
        await mockPayableController.create(mockData);
      } catch (error) {
        expect(error.message).toBe(expectedResult);
      }

      expect(mockPayableController.create).toHaveBeenCalledWith(mockData);
    });

    it('should throw an error if validation fails', async () => {
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

      try {
        await mockPayableController.create(mockData as any);
      } catch (error) {
        expect(error.message).toBe(expectedResult.join(', '));
      }

      expect(mockPayableController.create).toHaveBeenCalledWith(mockData);
    });
  });
});
