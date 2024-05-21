import { Test, TestingModule } from '@nestjs/testing';
import { PayablesController } from './payable.controller';
import { PayablesService } from './payable.service';

describe(PayablesController.name, () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PayablesController],
      providers: [PayablesService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(PayablesController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
