import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { payableCreatedMock, payableToCreationMock } from './mocks/mocks';
import PayableDto from '../dto/PayableDto';
import { JwtService } from '@nestjs/jwt';

describe('PayableController', () => {
  let payableController: PayableController;
  let payableService: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [
        {
          provide: PayableService,
          useValue: {
            createPayableRegister: jest
              .fn()
              .mockResolvedValue(payableCreatedMock),
            findPayableById: jest.fn().mockResolvedValue(payableCreatedMock),
            updatePayableById: jest.fn(),
            deletePayableById: jest.fn(),
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

    payableController = module.get<PayableController>(PayableController);
    payableService = module.get<PayableService>(PayableService);
  });

  it('should be defined', () => {
    expect(payableController).toBeDefined();
    expect(payableService).toBeDefined();
  });

  describe('createPayableRegister', () => {
    it('should create a new payable with success', async () => {
      await payableController.createPayableRegister(payableToCreationMock);

      expect(payableService.createPayableRegister).toHaveBeenCalledWith(
        payableToCreationMock.toEntity(),
      );
      expect(payableService.createPayableRegister).toHaveBeenCalledTimes(1);
    });
  });

  describe('findPayableById', () => {
    it('should find a payable by id with success', async () => {
      const result = await payableController.findPayableById('1234567890');

      expect(result).toBeInstanceOf(PayableDto);
      expect(payableService.findPayableById).toHaveBeenCalledWith('1234567890');
      expect(payableService.findPayableById).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when payable is not found', async () => {
      const id = '123456789';

      payableService.findPayableById = jest.fn().mockResolvedValueOnce(null);

      try {
        await payableController.findPayableById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Payable not found');
      }
    });
  });

  describe('updatePayableById', () => {
    it('should update a payable by id with success', async () => {
      await payableController.updatePayableById(
        '1234567890',
        payableToCreationMock,
      );

      expect(payableService.updatePayableById).toHaveBeenCalledWith(
        '1234567890',
        payableToCreationMock.toEntity(),
      );
      expect(payableService.updatePayableById).toHaveBeenCalledTimes(1);
    });
  });

  describe('deletePayableById', () => {
    it('should delete a payable by id with success', async () => {
      await payableController.deletePayableById('1234567890');

      expect(payableService.deletePayableById).toHaveBeenCalledWith(
        '1234567890',
      );
      expect(payableService.deletePayableById).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when payable is not found', async () => {
      const id = '123456789';

      payableService.deletePayableById = jest.fn().mockResolvedValueOnce(null);

      try {
        await payableController.deletePayableById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Payable not found');
      }
    });
  });
});
