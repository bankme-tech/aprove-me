import { Test, TestingModule } from '@nestjs/testing';
import { PayableConsumerController } from './payable-consumer.controller';
import { PayableConsumerService } from './payable-consumer.service';

describe('PayableConsumerController', () => {
  let payableConsumerController: PayableConsumerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PayableConsumerController],
      providers: [PayableConsumerService],
    }).compile();

    payableConsumerController = app.get<PayableConsumerController>(
      PayableConsumerController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(payableConsumerController.getHello()).toBe('Hello World!');
    });
  });
});
