import { InjectQueue, OnQueueCompleted, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Job, Queue } from "bull";
import { ReceivableDto } from "src/dtos/receivable.dto";
import { AssignorDto } from "src/dtos/assignor.dto";
import { UUID } from "crypto";
import { AssignorService } from "src/services/assignor.service";
import { ReceivableService } from "src/services/receivable.service";

@Processor('payables')
export class PayableConsumer {
  constructor(
    private readonly assignorService: AssignorService,
    private readonly receivableService: ReceivableService,
    @InjectQueue('payables')
    private readonly queue: Queue,
    @InjectQueue('deadQueue')
    private readonly deadQueue: Queue
  ) { }

  @Process('process-receivable')
  async process(job: Job<{ receivableData: ReceivableDto, assignorData?: AssignorDto }>) {
    try {
      const receivableData: ReceivableDto = job.data.receivableData;
      const assignorData: AssignorDto = job.data.assignorData;

      let assignorId: UUID;

      // Se o assignor ainda não existe, cria um novo
      if (assignorData) {
        const assignor = await this.assignorService.createAssignor(assignorData);
        assignorId = assignor.id as UUID;
      }
      // Se o assignor já existe e o id dele não foi passado
      else if (!receivableData.assignor) {
        throw new Error('Assignor data is required');
      }
      // Se o assignor já existe, pega o id dele
      else {
        assignorId = receivableData.assignor;
      }

      await this.receivableService.createReceivable({
        value: receivableData.value,
        emissionDate: new Date(receivableData.emissionDate),
        assignorRef: {
          connect: {
            id: assignorId
          }
        }
      });
    } catch (error) {
      throw error;
    }
  }

  @OnQueueCompleted()
  async handleCompleted(job: Job) {
    await this.handleJobCompletion(job);
  }

  @OnQueueFailed()
  async handleFaild(job: Job) {
    if (job.attemptsMade >= 4) {
      console.log(`Enviar email para o time de operações: Erro ao processar o item 4 vezes, adicionado à "fila morta".
      `);
      // Add job à "fila morta"
      this.deadQueue.add(job)
    }
    await this.handleJobCompletion(job);
  }

  async handleJobCompletion(job: Job) {
    const jobCounts = await this.queue.getJobCounts();
    if (jobCounts.waiting === 0 && jobCounts.active === 0 && jobCounts.delayed === 0) {
      console.log(`Enviar email: Processamento do lote concluído. ${jobCounts.completed} sucessos. ${jobCounts.failed} falhas.
      `);

      // Limpando a fila
      await this.queue.clean(0, 'wait');
      await this.queue.clean(0, 'active');
      await this.queue.clean(0, 'completed');
      await this.queue.clean(0, 'failed');
      await this.queue.clean(0, 'delayed');
      await this.queue.clean(0, 'paused');
    }
  }
}

