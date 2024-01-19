import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return version information', () => {
      const response = appController.version();

      expect(typeof response).toBe('object');
      expect(typeof response.date).toBe('string');
      expect(typeof response.version).toBe('string');
    });
  });
});
