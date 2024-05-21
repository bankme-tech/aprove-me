import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-integration.dto';
import { Test, TestingModule } from '@nestjs/testing';

describe('IntegrationsController', () => {
  let integrationsController: IntegrationsController;
  let integrationsService: IntegrationsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegrationsController],
      providers: [
        {
          provide: IntegrationsService,
          useValue: {
            createPayable: jest.fn(),
            getPayableById: jest.fn(),
            updatePayable: jest.fn(),
            deletePayable: jest.fn(),
            getAssignorById: jest.fn(),
            updateAssignor: jest.fn(),
            createAssignor: jest.fn(),
            deleteAssignor: jest.fn(),
          },
        },
      ],
    }).compile();

    integrationsController = module.get<IntegrationsController>(
      IntegrationsController,
    );
    integrationsService = module.get<IntegrationsService>(IntegrationsService);
  });

  it('should be defined', () => {
    expect(integrationsController).toBeDefined();
  });

  describe('createPayable', () => {
    it('should create a payable', async () => {
      const dto = new CreatePayableDto();
      dto.id = 'uuidd';
      dto.value = 100;
      dto.emissionDate = new Date();
      dto.assignor = 'assignor-uuid';
      jest
        .spyOn(integrationsService, 'createPayable')
        .mockResolvedValue(dto as any);

      expect(await integrationsController.createPayable(dto)).toBe(dto);
    });

    // it('should throw BadRequestException if value is negative', async () => {
    //   const dto = new CreatePayableDto();
    //   dto.id = 'uuid';
    //   dto.value = 10000000;
    //   dto.emissionDate = new Date();
    //   dto.assignor = 'assignor-uuid';
    //   await expect(integrationsController.createPayable(dto)).rejects.toThrow(
    //     BadRequestException,
    //   );
    // });
  });

  describe('getPayableById', () => {
    it('should return a payable if it exists', async () => {
      const result = {
        id: 'uuid',
        value: 100,
        emissionDate: new Date(),
        assignor: 'assignor-uuid',
      };
      jest
        .spyOn(integrationsService, 'getPayableById')
        .mockResolvedValue(result);
      expect(await integrationsController.getPayableById('uuid')).toBe(result);
    });

    it('should throw NotFoundException if payable does not exist', async () => {
      jest.spyOn(integrationsService, 'getPayableById').mockResolvedValue(null);
      await expect(
        integrationsController.getPayableById('uuid'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
