import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from '../payable.controller';
import { mock } from 'jest-mock-extended';
import { IPayableService } from '../interfaces/payable.service.interface';
import { PayableService } from '../payable.service';
import { createPayableMock } from './mock/create-payable.mock';

describe('PayableController', () => {
  let controller: PayableController;
  const payableServiceMock = mock<IPayableService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [
        {
          provide: PayableService,
          useValue: payableServiceMock,
        },
      ],
    }).compile();

    controller = module.get<PayableController>(PayableController);
  });

  describe('findAll()', () => {
    it('should call PayableService with success and correct params', () => {
      // ACT
      controller.findAll();

      // ASSERT
      expect(payableServiceMock.findAll).toHaveBeenCalled();
    });
  });

  describe('findById()', () => {
    it('should call PayableService with success and correct params', () => {
      // ACT
      controller.findById('id');

      // ASSERT
      expect(payableServiceMock.findById).toHaveBeenCalledWith('id');
    });
  });

  describe('create()', () => {
    it('should call PayableService with success and correct params', () => {
      // ARRANGE
      const payable = createPayableMock;

      // ACT
      controller.create(payable);

      // ASSERT
      expect(payableServiceMock.create).toHaveBeenCalledWith(payable);
    });
  });

  describe('update()', () => {
    it('should call PayableService with success and correct params', () => {
      // ARRANGE
      const payable = createPayableMock;

      // ACT
      controller.update('id', payable);

      // ASSERT
      expect(payableServiceMock.update).toHaveBeenCalledWith('id', payable);
    });
  });

  describe('delete()', () => {
    it('should call PayableService with success and correct params', () => {
      // ACT
      controller.delete('id');

      // ASSERT
      expect(payableServiceMock.delete).toHaveBeenCalledWith('id');
    });
  });

  describe('batch', () => {
    it('should call PayableService with success and correct params', () => {
      // ACT
      controller.batch([createPayableMock]);

      // ASSERT
      expect(payableServiceMock.batch).toHaveBeenCalledWith([
        createPayableMock,
      ]);
    });
  });
});
