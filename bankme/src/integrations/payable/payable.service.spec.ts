import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import PayableRepository from './payable.repository';
import { payableEntityMock, payableToCreationMock } from './mocks/mocks';
import PayableDto from '../dto/PayableDto';

describe('PayableService', () => {
  let payableService: PayableService;
  let payableRepository: PayableRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        {
          provide: PayableRepository,
          useValue: {
            createPayableRegister: jest
              .fn()
              .mockResolvedValue(payableEntityMock),
            findPayableById: jest.fn().mockResolvedValue(payableEntityMock),
            updatePayableById: jest.fn().mockResolvedValue(payableEntityMock),
            deletePayableById: jest.fn().mockResolvedValue(payableEntityMock),
          },
        },
      ],
    }).compile();

    payableService = module.get<PayableService>(PayableService);
    payableRepository = module.get<PayableRepository>(PayableRepository);
  });

  it('should be defined', () => {
    expect(payableService).toBeDefined();
    expect(payableRepository).toBeDefined();
  });

  describe('createPayableRegister', () => {
    it('should create a payable register', async () => {
      const result = await payableService.createPayableRegister(
        payableToCreationMock.toEntity(),
      );

      expect(result).toBeInstanceOf(PayableDto);
      expect(result).toStrictEqual(PayableDto.fromEntity(payableEntityMock));
      expect(payableRepository.createPayableRegister).toHaveBeenCalledWith(
        payableToCreationMock.toEntity(),
      );
      expect(payableRepository.createPayableRegister).toHaveBeenCalledTimes(1);
      expect(payableRepository.createPayableRegister).toHaveReturned();
    });
  });

  describe('findPayableById', () => {
    it('should find a payable by id', async () => {
      const result = await payableService.findPayableById('1');

      expect(result).toBeInstanceOf(PayableDto);
      expect(result).toStrictEqual(PayableDto.fromEntity(payableEntityMock));
      expect(payableRepository.findPayableById).toHaveBeenCalledWith('1');
      expect(payableRepository.findPayableById).toHaveBeenCalledTimes(1);
      expect(payableRepository.findPayableById).toHaveReturned();
    });

    it('should return null if not found', async () => {
      payableRepository.findPayableById = jest.fn().mockResolvedValue(null);
      try {
        await payableService.findPayableById('1');
      } catch (error) {
        expect(error.message).toBe('Payable not found.');
        expect(error.status).toBe(404);
      }
    });
  });

  describe('updatePayableById', () => {
    it('should update a payable by id', async () => {
      const result = await payableService.updatePayableById(
        '1',
        payableToCreationMock.toEntity(),
      );

      expect(result).toBeInstanceOf(PayableDto);
      expect(result).toStrictEqual(PayableDto.fromEntity(payableEntityMock));
      expect(payableRepository.updatePayableById).toHaveBeenCalledWith(
        '1',
        payableToCreationMock.toEntity(),
      );
      expect(payableRepository.updatePayableById).toHaveBeenCalledTimes(1);
      expect(payableRepository.updatePayableById).toHaveReturned();
    });

    it('should return null if not found', async () => {
      payableRepository.updatePayableById = jest.fn().mockResolvedValue(null);
      try {
        await payableService.updatePayableById(
          '1',
          payableToCreationMock.toEntity(),
        );
      } catch (error) {
        expect(error.message).toBe('Payable not found.');
        expect(error.status).toBe(404);
      }
    });
  });

  describe('deletePayableById', () => {
    it('should delete a payable by id', async () => {
      await payableService.deletePayableById('1');

      expect(payableRepository.deletePayableById).toHaveBeenCalledWith('1');
      expect(payableRepository.deletePayableById).toHaveBeenCalledTimes(1);
      expect(payableRepository.deletePayableById).toHaveReturned();
    });

    it('should return null if not found', async () => {
      payableRepository.deletePayableById = jest.fn().mockResolvedValue(null);
      try {
        await payableService.deletePayableById('1');
      } catch (error) {
        expect(error.message).toBe('Payable not found.');
        expect(error.status).toBe(404);
      }
    });
  });
});
