import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import PayableRepository from './payable.repository';
import { payableEntityMock, payableToCreationMock, req } from './mocks/mocks';
import PayableDto from '../dto/PayableDto';
import { AssignorService } from '../assignor/assignor.service';
import { assignorEntityMock } from '../assignor/mocks/mock';
import { fakerPT_BR } from '@faker-js/faker';

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
        {
          provide: AssignorService,
          useValue: {
            findAssignorByEmail: jest
              .fn()
              .mockResolvedValue(assignorEntityMock),
          },
        },
        {
          provide: 'PAYABLE_SERVICE',
          useValue: {
            emit: jest.fn(),
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
      const result = await payableService.findPayableById(payableEntityMock.id);

      expect(result).toBeInstanceOf(PayableDto);
      expect(result).toStrictEqual(PayableDto.fromEntity(payableEntityMock));
      expect(payableRepository.findPayableById).toHaveBeenCalledWith(
        payableEntityMock.id,
      );
      expect(payableRepository.findPayableById).toHaveBeenCalledTimes(1);
      expect(payableRepository.findPayableById).toHaveReturned();
    });

    it('should return null if not found', async () => {
      payableRepository.findPayableById = jest.fn().mockResolvedValue(null);
      try {
        await payableService.findPayableById(payableEntityMock.id);
      } catch (error) {
        expect(error.message).toBe('Payable not found.');
        expect(error.status).toBe(404);
      }
    });
  });

  describe('updatePayableById', () => {
    it('should update a payable by id', async () => {
      const result = await payableService.updatePayableById(
        payableEntityMock.id,
        payableToCreationMock.toEntity(),
        req.user.sub,
      );

      expect(result).toBeInstanceOf(PayableDto);
      expect(result).toStrictEqual(PayableDto.fromEntity(payableEntityMock));
      expect(payableRepository.updatePayableById).toHaveBeenCalledWith(
        payableEntityMock.id,
        payableToCreationMock.toEntity(),
      );
      expect(payableRepository.updatePayableById).toHaveBeenCalledTimes(1);
      expect(payableRepository.updatePayableById).toHaveReturned();
    });

    it('should return null if not found', async () => {
      const id = fakerPT_BR.string.uuid();
      payableRepository.findPayableById = jest.fn().mockResolvedValue(null);
      payableRepository.updatePayableById = jest.fn().mockResolvedValue(null);

      try {
        await payableService.updatePayableById(
          id,
          payableToCreationMock.toEntity(),
          req.user.sub,
        );
      } catch (error) {
        expect(error.message).toBe('Payable not found.');
        expect(error.status).toBe(404);
      }
    });
  });

  describe('deletePayableById', () => {
    it('should delete a payable by id', async () => {
      await payableService.deletePayableById(
        payableEntityMock.id,
        req.user.sub,
      );

      expect(payableRepository.deletePayableById).toHaveBeenCalledWith(
        payableEntityMock.id,
      );
      expect(payableRepository.deletePayableById).toHaveBeenCalledTimes(1);
      expect(payableRepository.deletePayableById).toHaveReturned();
    });

    it('should return null if not found', async () => {
      const id = fakerPT_BR.string.uuid();

      payableRepository.deletePayableById = jest.fn().mockResolvedValue(null);

      try {
        await payableService.deletePayableById(id, req.user.sub);
      } catch (error) {
        expect(error.message).toBe('Payable not found.');
        expect(error.status).toBe(404);
      }
    });
  });
});
