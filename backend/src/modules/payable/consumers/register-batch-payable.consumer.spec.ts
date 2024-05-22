/* eslint-disable @typescript-eslint/no-var-requires */
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterBatchPayableConsumer } from './register-batch-payable.consumer';
import { QueuesName } from '~/common/types/queues';
import Bull from 'bull';
import { PayableJob } from '~/common/types/payable.types';
import { RegisterPayableService } from '../services/register-payable/register-payable.service';
import { IPayableRepository } from '../repositories/interfaces/payable.repository-interface';
import { InMemoryPayableRepository } from '../repositories/in-memory/payable.repository';
import { IAssignorRepository } from '~/modules/assignor/repositories/interfaces/assignor.repository-interface';
import { InMemoryAssignorRepository } from '~/modules/assignor/repositories/in-memory/assignor.repository';
import { makeAssignor } from '~/modules/assignor/test/factories/make-assignor';
import { randomUUID } from 'crypto';

// Bull does not export these libs as module
const Job = require('bull/lib/job');
const Queue = require('bull/lib/queue');

describe('RegisterBatchPayableConsumer', () => {
  let service: RegisterBatchPayableConsumer;
  let assignorRepository: InMemoryAssignorRepository;
  let payableRepository: InMemoryPayableRepository;
  let queue: Bull.Queue<PayableJob>;
  let job: Bull.Job<PayableJob>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterBatchPayableConsumer,
        RegisterPayableService,
        {
          provide: IPayableRepository,
          useClass: InMemoryPayableRepository,
        },
        {
          provide: IAssignorRepository,
          useClass: InMemoryAssignorRepository,
        },
      ],
    }).compile();

    service = module.get(RegisterBatchPayableConsumer);
    assignorRepository = module.get(IAssignorRepository);
    payableRepository = module.get(IPayableRepository);

    queue = new Queue(QueuesName.PAYABLE, {
      redis: { port: 6379, host: '127.0.0.1' },
    });
  });

  afterEach(async () => {
    await queue.empty();
  });

  it('should process a payable job', async () => {
    const assignor = makeAssignor();

    await assignorRepository.create(assignor);

    job = await Job.create(queue, {
      value: 10.9,
      assignorId: assignor.id,
      emissionDate: new Date(),
    });

    const completedJobs = await queue.getCompletedCount();
    expect(payableRepository.items).toHaveLength(0);

    await service.process(job);

    expect(payableRepository.items).toHaveLength(1);
    expect(queue.getCompletedCount()).resolves.toEqual(completedJobs + 1);
  });

  it('should retry process an invalid payable job', async () => {
    job = await Job.create(queue, {
      value: 10.9,
      assignorId: 'invalid-assignor-id',
      emissionDate: new Date(),
    });

    const jobAttemptsMade = job.attemptsMade;

    await service.process(job);

    expect(job.attemptsMade).toEqual(jobAttemptsMade + 1);
  });

  it('should not retry process an invalid payable job after 4 times', async () => {
    job = await Job.create(
      queue,
      {
        value: 10.9,
        assignorId: 'invalid-assignor-id',
        emissionDate: new Date(),
      },
      { attempts: 2 },
    );

    const failedJobs = await queue.getFailedCount();
    const jobAttemptsMade = job.attemptsMade;

    await service.process(job);
    await service.process(job);

    expect(job.attemptsMade).toEqual(jobAttemptsMade + 2);

    await service.process(job);

    expect(queue.getFailedCount()).resolves.toEqual(failedJobs + 1);
  });

  it('should process an event onComplete job', async () => {
    const assignor = makeAssignor();

    await assignorRepository.create(assignor);

    const prefix = randomUUID();

    const payload = {
      value: 10.9,
      assignorId: assignor.id,
      emissionDate: new Date(),
    };

    job = await Job.create(queue, `${prefix}.0`, payload);

    await queue.add(`${prefix}.1`, payload);

    const result = await service.isCompletedBatch(job);

    expect(result).toBeFalsy();
  });
});
