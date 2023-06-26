import { Test, TestingModule } from '@nestjs/testing';
import { PayablesController } from './payables.controller';
import { PayablesService } from './payables.service';
import { PrismaService } from '../prisma/prisma.service';
import { Assignor, Payable } from '@prisma/client';
import { resourceLimits } from 'worker_threads';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('PayablesController', () => {
  let payablesController: PayablesController;
  let payablesService: PayablesService
  const payable: Payable = {
    id: 'test',
    value: 2.0,
    assignorId: 'test',
    emissionDate: new Date(),
  };  
  const assignor: Assignor = {
    id: 'test',
    document: 'test',
    email: 'test',
    phone: 'test',
    name: 'test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayablesController],
      providers: [
        PayablesService,
        PrismaService
      ],
    }).compile();

    payablesController = module.get<PayablesController>(PayablesController);
    payablesService = module.get<PayablesService>(PayablesService);
  });

  it('should be defined', () => {
    expect(payablesController).toBeDefined();
  });
  describe('create', () => {
    it('should return an Payable object', async () => {
      jest.spyOn(payablesService, 'create').mockResolvedValue(payable);

      expect(await payablesController.create(payable)).toBe(payable);
    });
  });
  describe('findAll', () => {
    it('should return an array of Payable\' objects', async () => {
      const result = {...payable, assignor}
      jest.spyOn(payablesService, 'findAll').mockResolvedValue([result]);

      expect(await payablesController.findAll()).toStrictEqual([result]);
    });
  });
  describe('findOne', () => {
    it('should return an Payable object', async () => {

      jest.spyOn(payablesService, 'findOne').mockResolvedValue(payable);

      expect(await payablesController.findOne('test')).toBe(payable);
    });
  });
  describe('update', () => {
    it('should return an Payable object', async () => {
      jest.spyOn(payablesService, 'update').mockResolvedValue(payable);

      expect(await payablesController.update('test', payable)).toBe(payable);
    });
  });
  
  describe('remove', () => {
    it('should throw NotFoundException', async () => {
      jest.spyOn(payablesService, 'remove').mockResolvedValue(payable);
      jest.spyOn(payablesService, 'checkIfExists').mockResolvedValue(true);

      expect(await payablesController.remove('test')).toBe(payable);
    });
    it('should return an Payable object', async () => {

      jest.spyOn(payablesService, 'checkIfExists').mockResolvedValue(false);
      try {
        await payablesController.remove('test')
      } catch (error) {        
        expect(error).toBeInstanceOf(HttpException)
        expect(error.message).toBe('Not found')
        expect(error.status).toBe(HttpStatus.NOT_FOUND)
      }
    });
  });
});
