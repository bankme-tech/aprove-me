import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './database/prisma.service';
import { IntegrationsController } from './integrations.controller';

describe('IntegrationsController', () => {
  let integrationsController: IntegrationsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IntegrationsController],
      providers: [PrismaService],
    }).compile();

    integrationsController = app.get<IntegrationsController>(IntegrationsController);
  });

});
