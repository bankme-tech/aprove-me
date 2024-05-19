import { InjectQueue, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Job, Queue } from "bull";
import { ReceivableDto } from "src/dtos/receivable.dto";
import { AssignorDto } from "src/dtos/assignor.dto";

@Processor('payables')
export class PayableConsumer {
  constructor (
    @InjectQueue('payables')
    private readonly queue: Queue
  ) {
    console.log('PayableConsumer instantiated');
  }

  @Process('process-receivable')
  async process(job: Job<{ receivableData: ReceivableDto, assignorData?: AssignorDto}>) {
    if(job.attemptsMade >= 4) {
      // adicionar a fila morta
    }
  }

}