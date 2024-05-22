import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../src/app.controller';

describe('AppController', () => {
  let sut: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    sut = app.get<AppController>(AppController);
  });

  test('should return API health check mesage', () => {
    expect(sut.healthCheck()).toEqual({
      message: 'Service is up and running',
    });
  });
});
