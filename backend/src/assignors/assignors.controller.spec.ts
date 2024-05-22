import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AssignorsController } from './assignors.controller';
import { AssignorsService } from './assignors.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

describe('AssignorsController', () => {
  let controller: AssignorsController;
  let service: DeepMockProxy<AssignorsService>;
  // let payableDto: CreatePayableDto;

  beforeEach(async () => {
    // payableDto = {
    //   id: randomUUID(),
    //   value: 100,
    //   emissionDate: new Date(),
    //   assignor: randomUUID(),
    // };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorsController],
      providers: [
        {
          provide: AssignorsService,
          useValue: mockDeep<AssignorsService>(),
        },
      ],
    }).compile();

    controller = module.get<AssignorsController>(AssignorsController);
    service = module.get<AssignorsService>(
      AssignorsService,
    ) as DeepMockProxy<AssignorsService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAssignorById', () => {
    it('should return an assignor if it exists', async () => {
      const assignorDto: CreateAssignorDto = {
        id: randomUUID(),
        document: '12345678901',
        email: 'email@example.com',
        phone: '1234567890',
        name: 'Assignor Name',
      };
      service.getAssignorById.mockResolvedValue(assignorDto);

      expect(await controller.getAssignorById(assignorDto.id)).toBe(
        assignorDto,
      );
    });

    it('should throw NotFoundException if assignor does not exist', async () => {
      service.getAssignorById.mockResolvedValue(null);
      await expect(
        controller.getAssignorById('non-existent-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateAssignor', () => {
    it('should update an assignor', async () => {
      const updateAssignorDto: UpdateAssignorDto = {
        document: '12345678901',
        email: 'updated@example.com',
        phone: '1234567890',
        name: 'Updated Assignor Name',
      };
      const randomId = randomUUID();
      const data = {
        ...updateAssignorDto,
        id: randomId,
      };

      service.updateAssignor.mockResolvedValue(data);

      expect(await controller.updateAssignor(data.id, updateAssignorDto)).toBe(
        data,
      );
    });

    it('should throw NotFoundException if assignor does not exist', async () => {
      service.updateAssignor.mockRejectedValue(
        new NotFoundException('Assignor not found'),
      );
      const updateAssignorDto: UpdateAssignorDto = {
        document: '12345678901',
        email: 'updated@example.com',
        phone: '1234567890',
        name: 'Updated Assignor Name',
      };

      await expect(
        controller.updateAssignor('non-existent-id', updateAssignorDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('createAssignor', () => {
    it('should create an assignor', async () => {
      const assignorDto: CreateAssignorDto = {
        id: randomUUID(),
        document: '12345678901',
        email: 'email@example.com',
        phone: '1234567890',
        name: 'Assignor Name',
      };
      service.createAssignor.mockResolvedValue(assignorDto);

      expect(await controller.create(assignorDto)).toBe(assignorDto);
    });
  });

  describe('deleteAssignor', () => {
    it('should delete an assignor', async () => {
      const assignorDto: CreateAssignorDto = {
        id: randomUUID(),
        document: '12345678901',
        email: 'email@example.com',
        phone: '1234567890',
        name: 'Assignor Name',
      };
      service.deleteAssignor.mockResolvedValue(assignorDto);

      expect(await controller.deleteAssignor(assignorDto.id)).toBe(assignorDto);
    });

    it('should throw NotFoundException if assignor does not exist', async () => {
      service.deleteAssignor.mockRejectedValue(
        new NotFoundException('Assignor not found'),
      );

      await expect(
        controller.deleteAssignor('non-existent-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
