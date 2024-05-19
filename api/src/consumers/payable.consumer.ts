import { InjectQueue, OnQueueFailed, Process, Processor } from "@nestjs/bull";
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
    private readonly queue: Queue
  ) {
    console.log('PayableConsumer instantiated');
  }

  @Process('process-receivable')
  async process(job: Job<{ receivableData: ReceivableDto, assignorData?: AssignorDto }>) {
    if (job.attemptsMade >= 4) {
      // adicionar a fila morta
      return;
    }

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

}