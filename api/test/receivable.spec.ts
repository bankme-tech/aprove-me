import { Test, TestingModule } from '@nestjs/testing';
import { ReceivableController } from '../src/controllers/receivable.controller';
import { ReceivableService } from '../src/services/receivable.service';
import { AssignorService } from '../src/services/assignor.service';
import { UUID } from 'crypto';

describe('ReceivableController', () => {
  let controller: ReceivableController;
  let service: ReceivableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceivableController],
      providers: [
        { provide: ReceivableService, useValue: {
          receivable: jest.fn(),
          receivables: jest.fn(),
        } },
        { provide: AssignorService, useValue: {} },
      ],
    }).compile();

    controller = module.get<ReceivableController>(ReceivableController);
    service = module.get<ReceivableService>(ReceivableService);
  });

  it('should return a receivable', async () => {
    const result = { id: '1', value: 100, emissionDate: new Date(), assignor: 'John Doe' };
    jest.spyOn(service, 'receivable').mockResolvedValue(result);

    expect(await controller.getReceivable('1' as UUID)).toBe(result);
  });

  it('should return all receivables', async () => {
    const result = [
      { id: '1', value: 100, emissionDate: new Date(), assignor: 'John Doe' },
      { id: '2', value: 200, emissionDate: new Date(), assignor: 'Jane Smith' }
    ];
    jest.spyOn(service, 'receivables').mockResolvedValue(result);

    expect(await controller.getAllReceivables()).toBe(result);
  });
});