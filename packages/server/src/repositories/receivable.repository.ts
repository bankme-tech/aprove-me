import { receivableBodyDto, receivableListResponseDto, receivableResponseDto } from 'src/dtos/receivable.dto';
import { Result } from 'src/types/either';

export abstract class ReceivableRepository {
  abstract create_receivable(receivable: receivableBodyDto): ReceivableRepository.IdResponseType;
  abstract get_receivable(id: string): ReceivableRepository.responseType;
  abstract get_list_receivable(): ReceivableRepository.listResponseType;
  abstract delete_receivable(id: string): Promise<void>;
  abstract update_receivable(id: string, receivable: ReceivableRepository.bodyType): ReceivableRepository.responseType;
}

export namespace ReceivableRepository {
  export type bodyType = Partial<receivableBodyDto>;
  export type responseType = Promise<Result<Error, receivableResponseDto>>;
  export type listResponseType = Promise<Result<Error, receivableListResponseDto>>;
  export type IdResponseType = Promise<Result<Error, { id: string }>>;
}
