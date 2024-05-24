import { RemoveAssignorInputDTO } from '../dto/remove-assignor.input.dto';

export abstract class IRemoveAssignorUseCase {
  abstract execute(removeAssignorDTO: RemoveAssignorInputDTO): Promise<void>;
}
