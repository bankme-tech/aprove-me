import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';

describe('Main', () => {
  let app;
  let controller: AppController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [],
    }).compile();

    controller = module.get<AppController>(AppController);
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
  it('Deve returnar uma mensagem', () => {
    jest.spyOn(controller, 'welcome');

    const result = controller.welcome();
    expect(result).toEqual({
      message: 'Seja bem-vindo à nossa bela API!',
    });
  });
});
