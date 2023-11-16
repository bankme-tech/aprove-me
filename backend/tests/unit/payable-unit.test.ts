import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Payable } from '@prisma/client';
import { PayableService } from '../../src/payable/payable.service';
import { PayableRepository } from '../../src/payable/payable.repository';
import { CreatePayableDto } from '../../src/payable/dto/create-payable.dto';
import { UpdatePayableDto } from '../../src/payable/dto/update-payable.dto';
import { PrismaService } from '../../src/prisma/prisma.service';
import { cleanDB } from '../helpers';

describe('Payable Service Unit Tests', () => {
  let payableService: PayableService;
  let payableRepository: PayableRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayableService, PayableRepository, PrismaService],
    }).compile();

    payableService = module.get<PayableService>(PayableService);
    payableRepository = module.get<PayableRepository>(PayableRepository);
    prismaService = module.get<PrismaService>(PrismaService);

    await cleanDB(prismaService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a payable', async () => {
      const createPayableDto: CreatePayableDto = {
        assignorId: 1,
        value: 100,
        emissionDate: new Date(),
      };

      jest
        .spyOn(payableRepository, 'doesAssignorExist')
        .mockResolvedValue(true);
      jest.spyOn(payableRepository, 'create').mockResolvedValue({} as Payable);

      const result = await payableService.create(createPayableDto);
      expect(result).toBeDefined();
      expect(payableRepository.doesAssignorExist).toHaveBeenCalledWith(
        createPayableDto.assignorId,
      );
      expect(payableRepository.create).toHaveBeenCalledWith(createPayableDto);
    });

    it('should throw NotFoundException if assignor does not exist', async () => {
      const createPayableDto: CreatePayableDto = {
        assignorId: 1,
        value: 100,
        emissionDate: new Date(),
      };

      jest
        .spyOn(payableRepository, 'doesAssignorExist')
        .mockResolvedValue(false);

      await expect(payableService.create(createPayableDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(payableRepository.doesAssignorExist).toHaveBeenCalledWith(
        createPayableDto.assignorId,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of payables', async () => {
      const payable1: Payable = {
        id: '1',
        value: 1000,
        emissionDate: new Date('2023-01-01'),
        assignorId: 123,
      };

      const payable2: Payable = {
        id: '2',
        value: 1500,
        emissionDate: new Date('2023-01-02'),
        assignorId: 456,
      };

      const payables: Payable[] = [payable1, payable2];

      jest.spyOn(payableRepository, 'findAll').mockResolvedValue(payables);

      const result = await payableService.findAll();

      expect(result).toEqual(payables);
      expect(payableRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a payable by ID', async () => {
      const payableId = '1';
      const payable: Payable = {
        id: payableId,
        value: 1000,
        emissionDate: new Date('2023-01-01'),
        assignorId: 123,
      };

      jest.spyOn(payableRepository, 'findOne').mockResolvedValue(payable);

      const result = await payableService.findOne(payableId);

      expect(result).toEqual(payable);
      expect(payableRepository.findOne).toHaveBeenCalledWith(payableId);
    });

    it('should throw NotFoundException if payable does not exist', async () => {
      const payableId = '1';

      jest.spyOn(payableRepository, 'findOne').mockResolvedValue(null);

      await expect(
        async () => await payableService.findOne(payableId),
      ).rejects.toThrow(NotFoundException);

      expect(payableRepository.findOne).toHaveBeenCalledWith(payableId);
    });
  });

  describe('update', () => {
    it('should update a payable', async () => {
      const payableId = '1';
      const updatePayableDto: UpdatePayableDto = {
        value: 150,
        emissionDate: new Date(),
        assignorId: 2,
      };

      jest
        .spyOn(payableService, 'validatePayableExists')
        .mockResolvedValue(null);
      jest
        .spyOn(payableService, 'validateAssignorExists')
        .mockResolvedValue(null);
      jest.spyOn(payableRepository, 'update').mockResolvedValue({} as Payable);

      const result = await payableService.update(payableId, updatePayableDto);
      expect(result).toBeDefined();
      expect(payableService.validatePayableExists).toHaveBeenCalledWith(
        payableId,
      );
      expect(payableService.validateAssignorExists).toHaveBeenCalledWith(
        updatePayableDto.assignorId,
      );
      expect(payableRepository.update).toHaveBeenCalledWith(
        payableId,
        updatePayableDto,
      );
    });

    it('should throw NotFoundException if payable does not exist', async () => {
      const payableId = '1';
      const updatePayableDto: UpdatePayableDto = {
        value: 150,
        emissionDate: new Date(),
        assignorId: 2,
      };

      jest
        .spyOn(payableService, 'validatePayableExists')
        .mockRejectedValue(
          new NotFoundException(`Payable with id ${payableId} not found.`),
        );

      await expect(
        payableService.update(payableId, updatePayableDto),
      ).rejects.toThrow(NotFoundException);
      expect(payableService.validatePayableExists).toHaveBeenCalledWith(
        payableId,
      );
    });

    it('should throw NotFoundException if assignor does not exist', async () => {
      const payableId = '1';
      const updatePayableDto: UpdatePayableDto = {
        value: 150,
        emissionDate: new Date(),
        assignorId: 2,
      };

      jest
        .spyOn(payableService, 'validatePayableExists')
        .mockResolvedValue(null);
      jest
        .spyOn(payableService, 'validateAssignorExists')
        .mockRejectedValue(
          new NotFoundException(
            `Assignor with id ${updatePayableDto.assignorId} not found.`,
          ),
        );

      await expect(
        payableService.update(payableId, updatePayableDto),
      ).rejects.toThrow(NotFoundException);
      expect(payableService.validatePayableExists).toHaveBeenCalledWith(
        payableId,
      );
      expect(payableService.validateAssignorExists).toHaveBeenCalledWith(
        updatePayableDto.assignorId,
      );
    });
  });

  describe('remove', () => {
    it('should remove a payable', async () => {
      const payableId = '1';
      const removedPayable: Payable = {
        id: payableId,
        value: 1000,
        emissionDate: new Date('2023-01-01'),
        assignorId: 123,
      };

      jest
        .spyOn(payableService, 'validatePayableExists')
        .mockResolvedValue(null);
      jest.spyOn(payableRepository, 'remove').mockResolvedValue(removedPayable);

      const result = await payableService.remove(payableId);

      expect(result).toEqual(removedPayable);
      expect(payableService.validatePayableExists).toHaveBeenCalledWith(
        payableId,
      );
      expect(payableRepository.remove).toHaveBeenCalledWith(payableId);
    });

    it('should throw NotFoundException if payable does not exist', async () => {
      const nonExistingPayableId = '2';

      jest
        .spyOn(payableService, 'validatePayableExists')
        .mockRejectedValue(
          new NotFoundException(
            `Payable with id ${nonExistingPayableId} not found.`,
          ),
        );

      await expect(payableService.remove(nonExistingPayableId)).rejects.toThrow(
        NotFoundException,
      );
      expect(payableService.validatePayableExists).toHaveBeenCalledWith(
        nonExistingPayableId,
      );
    });
  });
});
