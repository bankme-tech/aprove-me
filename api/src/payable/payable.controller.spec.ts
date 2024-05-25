import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { Payable } from './entities/payable.entity';
import { BadRequestException } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { JwtService } from '@nestjs/jwt';

const payableEntityList = [
  new Payable({
    id: '1',
    value: 100,
    emissionDate: new Date(),
    assignorId: '1',
  }),
  new Payable({
    id: '2',
    value: 200,
    emissionDate: new Date(),
    assignorId: '2',
  }),
  new Payable({
    id: '3',
    value: 300,
    emissionDate: new Date(),
    assignorId: '3',
  }),
  new Payable({
    id: '4',
    value: 400,
    emissionDate: new Date(),
    assignorId: '2',
  }),
];

describe('PayableController', () => {
  let payableControler: PayableController;
  let payableService: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [
        JwtService,
        {
          provide: PayableService,
          useValue: {
            create: jest.fn().mockResolvedValue(payableEntityList[0]),
            findAll: jest.fn().mockResolvedValue(payableEntityList),
            findOne: jest.fn().mockResolvedValue(payableEntityList[1]),
            update: jest.fn().mockResolvedValue(payableEntityList[2]),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    payableControler = module.get<PayableController>(PayableController);
    payableService = module.get<PayableService>(PayableService);
  });

  it('should be defined', () => {
    expect(payableControler).toBeDefined();
    expect(payableService).toBeDefined();
  });

  describe('createPayable', () => {
    it('should create a payable', async () => {
      // Arrange
      const payableInsert = {
        value: 100,
        assignorId: '1',
      };

      // Act
      const result = await payableControler.create(payableInsert);

      // Assert
      expect(result).toEqual(payableEntityList[0]);
      expect(payableService.create).toHaveBeenCalledWith(payableInsert);
    });

    it('should throw an error if assignor does not exist', async () => {
      // Arrange
      jest
        .spyOn(payableService, 'create')
        .mockRejectedValueOnce(new Error('Assignor not found'));

      const payableInsert = {
        value: 100,
        assignorId: '5',
      };

      // Act
      try {
        await payableControler.create(payableInsert);
      } catch (error) {
        // Assert
        expect(error.message).toBe('Assignor not found');
      }
      expect(payableService.create).toHaveBeenCalledWith(payableInsert);
    });

    it('should throw an error if validation fails', async () => {
      // Arrange
      jest
        .spyOn(payableService, 'create')
        .mockRejectedValueOnce(
          new BadRequestException([
            'value has wrong value 1000, value must be a number conforming to the specified constraints',
            'assignor has wrong value 1, assignor must be a UUID',
          ]),
        );

      const payableInsert = {
        value: '100',
        assignor: 1,
      };

      // Act
      try {
        await payableControler.create(
          payableInsert as unknown as CreatePayableDto,
        );
      } catch (error) {
        // Assert
        expect(error.message).toBe('Bad Request Exception');
        expect(error.response.message).toEqual([
          'value has wrong value 1000, value must be a number conforming to the specified constraints',
          'assignor has wrong value 1, assignor must be a UUID',
        ]);
      }
      expect(payableService.create).toHaveBeenCalledWith(payableInsert);
    });
  });

  describe('findAll', () => {
    it('should return an array of payables', async () => {
      // Act
      const result = await payableControler.findAll();

      // Assert
      expect(result).toEqual(payableEntityList);
      expect(payableService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('should return a payable', async () => {
      // Arrange
      const id = '1';

      // Act
      const result = await payableControler.findOne(id);

      // Assert
      expect(payableService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(payableEntityList[1]);
    });

    it('should throw an error if payable does not exist', async () => {
      // Arrange
      jest
        .spyOn(payableService, 'findOne')
        .mockRejectedValueOnce(new BadRequestException('Payable not found'));

      const id = '5';

      // Act
      try {
        await payableControler.findOne(id);
      } catch (error) {
        // Assert
        expect(error.message).toBe('Payable not found');
      }
      expect(payableService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a payable', async () => {
      // Arrange
      const id = '3';
      const payableUpdate = {
        value: 300,
        assignor: '3',
      };

      // Act
      const result = await payableControler.update(id, payableUpdate);

      // Assert
      expect(result).toEqual(payableEntityList[2]);
      expect(payableService.update).toHaveBeenCalledWith(id, payableUpdate);
    });

    it('should throw an error if payable does not exist', async () => {
      // Arrange
      jest
        .spyOn(payableService, 'update')
        .mockRejectedValueOnce(new BadRequestException('Payable not found'));

      const id = '5';
      const payableUpdate = {
        value: 300,
        assignor: '3',
      };

      // Act
      try {
        await payableControler.update(id, payableUpdate);
      } catch (error) {
        // Assert
        expect(error.message).toBe('Payable not found');
      }
      expect(payableService.update).toHaveBeenCalledWith(id, payableUpdate);
    });

    it('should throw an error if validation fails', async () => {
      // Arrange
      jest
        .spyOn(payableService, 'update')
        .mockRejectedValueOnce(
          new BadRequestException([
            'value has wrong value 1000, value must be a number conforming to the specified constraints',
            'assignor has wrong value 1, assignor must be a UUID',
          ]),
        );

      const id = '3';
      const payableUpdate = {
        value: '300',
        assignor: 1,
      };

      // Act
      try {
        await payableControler.update(
          id,
          payableUpdate as unknown as CreatePayableDto,
        );
      } catch (error) {
        // Assert
        expect(error.message).toBe('Bad Request Exception');
        expect(error.response.message).toEqual([
          'value has wrong value 1000, value must be a number conforming to the specified constraints',
          'assignor has wrong value 1, assignor must be a UUID',
        ]);
      }
      expect(payableService.update).toHaveBeenCalledWith(id, payableUpdate);
    });
  });

  describe('remove', () => {
    it('should remove a payable', async () => {
      // Arrange
      const id = '4';

      // Act
      const result = await payableControler.remove(id);

      // Assert
      expect(result).toEqual({});
      expect(payableService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an error if payable does not exist', async () => {
      // Arrange
      jest
        .spyOn(payableService, 'remove')
        .mockRejectedValueOnce(new BadRequestException('Payable not found'));

      const id = '5';

      // Act
      try {
        await payableControler.remove(id);
      } catch (error) {
        // Assert
        expect(error.message).toBe('Payable not found');
      }
      expect(payableService.remove).toHaveBeenCalledWith(id);
    });
  });
});
