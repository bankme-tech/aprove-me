import { Result } from 'src/types/either';
import { assignorResponseDto, assignorBodyDto } from '../dtos/assignor.dto';

export abstract class AssignorRepository {
  abstract create_assignor(assignor: AssignorRepository.bodyType): AssignorRepository.IdResponseType;
  abstract get_assignor(id: string): AssignorRepository.responseType;
  abstract get_list_assignor(): AssignorRepository.listResponseType;
  abstract delete_assignor(id: string): Promise<Result<Error, void>>;
  abstract update_assignor(id: string, assignor: AssignorRepository.bodyType): AssignorRepository.IdResponseType;
}

export namespace AssignorRepository {
  export type bodyType = assignorBodyDto;
  export type responseType = Promise<Result<Error, assignorResponseDto>>;
  export type IdResponseType = Promise<Result<Error, { id: string }>>;
  export type listResponseType = Promise<Result<Error, assignorResponseDto[]>>;
}
