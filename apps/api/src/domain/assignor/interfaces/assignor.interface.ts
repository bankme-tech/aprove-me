import { Id } from '@domain/shared/id';

export interface IAssignor {
  readonly id: Id;
  readonly document: string;
  readonly email: string;
  readonly phone: string;
  readonly name: string;
}
