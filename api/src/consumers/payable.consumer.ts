import { InjectQueue, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Job, Queue } from "bull";
import { Assignor } from "src/controllers/assignor.controller";
import { Receivable } from "src/controllers/receivable.controller";

@Processor('payables')
export class PayableConsumer {
  constructor (
    @InjectQueue('payables')
    private readonly queue: Queue
  ) {
    console.log('PayableConsumer instantiated');
  }

  @Process('process-receivable')
  async process(job: Job<{ receivableData: Receivable, assignorData?: Assignor}>) {
    if(job.attemptsMade >= 4) {
      // adicionar a fila morta
    }
  }

}