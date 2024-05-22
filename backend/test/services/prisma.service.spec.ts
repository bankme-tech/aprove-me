import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../src/persistence/prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });
});
