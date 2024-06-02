import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { payableCreatedMock, payableToCreationMock, req } from './mocks/mocks';
import PayableDto from '../dto/PayableDto';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { fakerPT_BR } from '@faker-js/faker';

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
      const id = fakerPT_BR.string.uuid();

      jest
        .spyOn(payableService, 'findPayableById')
        .mockRejectedValue(
          new HttpException('Payable not found.', HttpStatus.NOT_FOUND),
        );

      try {
        await payableController.findPayableById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Payable not found.');
      }
    });
  });

  describe('updatePayableById', () => {
    it('should update a payable by id with success', async () => {
      await payableController.updatePayableById(
        req,
        payableCreatedMock.id,
        payableToCreationMock,
      );

      expect(payableService.updatePayableById).toHaveBeenCalledWith(
        payableCreatedMock.id,
        payableToCreationMock.toEntity(),
        req.user.sub,
      );
      expect(payableService.updatePayableById).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when payable is not found', async () => {
      const id = fakerPT_BR.string.uuid();

      jest
        .spyOn(payableService, 'updatePayableById')
        .mockRejectedValue(
          new HttpException('Payable not found.', HttpStatus.NOT_FOUND),
        );

      try {
        await payableController.updatePayableById(
          req,
          id,
          payableToCreationMock,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Payable not found.');
      }
    });
  });

  describe('deletePayableById', () => {
    it('should delete a payable by id with success', async () => {
      await payableController.deletePayableById(req, payableCreatedMock.id);

      expect(payableService.deletePayableById).toHaveBeenCalledWith(
        payableCreatedMock.id,
        req.user.sub,
      );
      expect(payableService.deletePayableById).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when payable is not found', async () => {
      const id = fakerPT_BR.string.uuid();

      jest
        .spyOn(payableService, 'deletePayableById')
        .mockRejectedValue(
          new HttpException('Payable not found.', HttpStatus.NOT_FOUND),
        );

      try {
        await payableController.deletePayableById(req, id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Payable not found.');
      }
    });
  });
});
