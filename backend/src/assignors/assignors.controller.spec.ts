import { Test, TestingModule } from '@nestjs/testing';
import { AssignorsController } from './assignors.controller';
import { AssignorsService } from './assignors.service';
import { PrismaService } from '../prisma/prisma.service';

import { Assignor } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AssignorsController', () => {
  let assignorsController: AssignorsController;
  let assignorsService: AssignorsService;
  const result = {
    id: 'test',
    document: 'test',
    email: 'test',
    phone: 'test',
    name: 'test',
    payables: [{
      id: 'test',
      value: 1,
      emissionDate: new Date(),
      assignorId: 'test'
    }]
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorsController],
      providers: [AssignorsService, PrismaService],
    }).compile();

    assignorsService = module.get<AssignorsService>(AssignorsService);
    assignorsController = module.get<AssignorsController>(AssignorsController);
  });

  it('should be defined', () => {
    expect(assignorsController).toBeDefined();
  });
  describe('create', () => {
    it('should return an Assignor object', async () => {
      const result: Assignor = {
        id: 'test',
        document: 'test',
        email: 'test',
        phone: 'test',
        name: 'test',
      };
      jest.spyOn(assignorsService, 'create').mockResolvedValue(result);

      expect(await assignorsController.create(result)).toBe(result);
    });
  });
  describe('findAll', () => {
    it('should return an array of Assignors\' objects', async () => {
      jest.spyOn(assignorsService, 'findAll').mockResolvedValue([result]);

      expect(await assignorsController.findAll()).toStrictEqual([result]);
    });
  });
  describe('findOne', () => {
    it('should return an Assignor object', async () => {

      jest.spyOn(assignorsService, 'findOne').mockResolvedValue(result);

      expect(await assignorsController.findOne('test')).toBe(result);
    });
  });
  describe('update', () => {
    it('should return an Assignor object', async () => {
      jest.spyOn(assignorsService, 'update').mockResolvedValue(result);

      expect(await assignorsController.update('test', result)).toBe(result);
    });
  });
  describe('remove', () => {
    it('should throw NotFoundException', async () => {
      jest.spyOn(assignorsService, 'remove').mockResolvedValue(result);
      jest.spyOn(assignorsService, 'checkIfExists').mockResolvedValue(true);

      expect(await assignorsController.remove('test')).toBe(result);
    });
    it('should return an Assignor object', async () => {

      jest.spyOn(assignorsService, 'checkIfExists').mockResolvedValue(false);
      try {
        await assignorsController.remove('test')
      } catch (error) {        
        expect(error).toBeInstanceOf(HttpException)
        expect(error.message).toBe('Not found')
        expect(error.status).toBe(HttpStatus.NOT_FOUND)
      }
    });
  });

});
