import { Test, TestingModule } from '@nestjs/testing';
import { PayablesController } from './payables.controller';
import { PayablesService } from './payables.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PayableEntity } from './entities/payable.entity';
import { BadRequestException } from '@nestjs/common';

describe('PayablesController', () => {
  let controller: PayablesController;
  let service: PayablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayablesController],
      providers: [
        {
          provide: PayablesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            batchCreate: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PayablesController>(PayablesController);
    service = module.get<PayablesService>(PayablesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with the correct data', async () => {
      const createPayableDto = new CreatePayableDto();
      const payableEntity = new PayableEntity({
        id: '1',
        value: 100,
        emissionDate: new Date(),
        assignor: 'Assignor A',
      });
      jest.spyOn(service, 'create').mockResolvedValue(payableEntity);

      const result = await controller.create(createPayableDto);
      expect(service.create).toHaveBeenCalledWith(createPayableDto);
      expect(result).toEqual(new PayableEntity(payableEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of PayableEntity', async () => {
      const payableEntity = new PayableEntity({
        id: '1',
        value: 100,
        emissionDate: new Date(),
        assignor: 'Assignor A',
      });
      jest.spyOn(service, 'findAll').mockResolvedValue([payableEntity]);

      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([new PayableEntity(payableEntity)]);
    });
  });

  describe('findOne', () => {
    it('should return a single PayableEntity', async () => {
      const id = '1';
      const payableEntity = new PayableEntity({
        id,
        value: 100,
        emissionDate: new Date(),
        assignor: 'Assignor A',
      });
      jest.spyOn(service, 'findOne').mockResolvedValue(payableEntity);

      const result = await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(new PayableEntity(payableEntity));
    });
  });

  describe('update', () => {
    it('should update and return the updated PayableEntity', async () => {
      const id = '1';
      const updatePayableDto = new UpdatePayableDto();
      const payableEntity = new PayableEntity({
        id,
        value: 200,
        emissionDate: new Date(),
        assignor: 'Assignor B',
      });
      jest.spyOn(service, 'update').mockResolvedValue(payableEntity);

      const result = await controller.update(id, updatePayableDto);
      expect(service.update).toHaveBeenCalledWith(id, updatePayableDto);
      expect(result).toEqual(new PayableEntity(payableEntity));
    });
  });

  describe('remove', () => {
    it('should remove and return the removed PayableEntity', async () => {
      const id = '1';
      const payableEntity = new PayableEntity({
        id,
        value: 100,
        emissionDate: new Date(),
        assignor: 'Assignor A',
      });
      jest.spyOn(service, 'remove').mockResolvedValue(payableEntity);

      const result = await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(new PayableEntity(payableEntity));
    });
  });

  describe('batchCreate', () => {
    it('should throw BadRequestException if more than 10000 items are provided', async () => {
      const dtoArray = new Array(10001).fill(new CreatePayableDto());
      await expect(controller.batchCreate(dtoArray)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should call service.batchCreate with valid data', async () => {
      const dtoArray = new Array(10).fill(new CreatePayableDto());
      await controller.batchCreate(dtoArray);
      expect(service.batchCreate).toHaveBeenCalledWith(dtoArray);
    });
  });
});
