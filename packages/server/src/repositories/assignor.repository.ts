import { Result } from 'src/types/either';
import { assignorResponseDto, assignorBodyDto, assignorUniqueResponseType } from 'src/dtos/assignor.dto';

export abstract class AssignorRepository {
  abstract create_assignor(assignor: AssignorRepository.bodyType): AssignorRepository.responseType;
  abstract get_assignor(id: string): AssignorRepository.responseType;
  abstract get_list_assignor(): AssignorRepository.listResponseType;
  abstract delete_assignor(id: string): Promise<Result<Error, void>>;
  abstract get_assignor_by_document(document: string): AssignorRepository.responseType;
  abstract get_assignor_by_email(email: string): AssignorRepository.responseType;
  abstract get_assignor_by_phone(phone: string): AssignorRepository.responseType;
  abstract get_unique_assignor(
    assignor: Partial<AssignorRepository.bodyType>,
  ): Promise<Result<Error, assignorUniqueResponseType>>;
  abstract update_assignor(
    id: string,
    assignor: Partial<AssignorRepository.bodyType>,
  ): AssignorRepository.IdResponseType;
}

export namespace AssignorRepository {
  export type bodyType = assignorBodyDto;
  export type responseType = Promise<Result<Error, assignorResponseDto>>;
  export type IdResponseType = Promise<Result<Error, { id: string }>>;
  export type listResponseType = Promise<Result<Error, assignorResponseDto[]>>;
}
