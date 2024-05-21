import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';

describe(AssignorController.name, () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [AssignorService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(AssignorController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
