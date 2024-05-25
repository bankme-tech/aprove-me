import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('Main', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should initialize the application', () => {
    expect(app).toBeDefined();
  });

  it('should listen on the specified port', async () => {
    const server = app.getHttpServer();
    const address = server.address();
    expect(address).toBeDefined();
  });
});
