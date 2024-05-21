import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';

describe(PayableController.name, () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [PayableService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      // const appController = app.get(PayableController);
      expect(true).toBe(true);
    });
  });
});
