import { Test, TestingModule } from '@nestjs/testing';
import { CrudStrategyService } from './crud-strategy.service';

describe('CrudStrategyService', () => {
  let service: CrudStrategyService<any, any, any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrudStrategyService],
    }).compile();

    service =
      module.get<CrudStrategyService<any, any, any>>(CrudStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
