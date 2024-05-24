import { RemovePayableInputDTO } from '../dto/remove-payable.input.dto';

export abstract class IRemovePayableUseCase {
  abstract execute(removePayableDTO: RemovePayableInputDTO): Promise<void>;
}
