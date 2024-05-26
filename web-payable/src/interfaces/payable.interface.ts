import { AssignorEntity } from "./assignor.interface";

export interface PayableDto {
  id: string;
  /** É o valor do recebível */
  value: number;
  /** É a data de emissão do recebível */
  emissionDate: string;
  /** Representa a identificação de um cedente */
  assignor: string;
}

export interface PayableEntity {
  id: string;
  /** É o valor do recebível */
  value: number;
  /** É a data de emissão do recebível */
  emissionDate: string;
  /** Representa a identificação de um cedente */
  assignorId: string;
  assignor?: AssignorEntity;
}
