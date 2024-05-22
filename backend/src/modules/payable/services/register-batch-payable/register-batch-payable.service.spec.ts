import { Test, TestingModule } from '@nestjs/testing';
import { RegisterBatchPayableService } from './register-batch-payable.service';
import { BullModule } from '@nestjs/bull';
import { QueuesName } from '~/common/types/queues';
import { makePayable } from '../../test/factories/make-payable';
import { BadRequest } from '~/common/exceptions/bad-request.exception';

describe('RegisterBatchPayableService', () => {
  let service: RegisterBatchPayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BullModule.registerQueue({ name: QueuesName.PAYABLE })],
      providers: [RegisterBatchPayableService],
    }).compile();

    service = module.get<RegisterBatchPayableService>(
      RegisterBatchPayableService,
    );
  });

  it('should register batch payables', async () => {
    const result = await service.execute({
      payables: [makePayable(), makePayable()],
    });

    expect(result.isRight()).toBeTruthy();
  });

  it('should not register more than 10.000 payables', async () => {
    const result = await service.execute({
      payables: new Array(10001).fill(null),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(BadRequest);
  });
});
