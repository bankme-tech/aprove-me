import { AssignorPersistence } from './assignor.types';

export interface PayablePersistence {
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;
  assignor?: AssignorPersistence;
}

export type PayableJob = {
  value: number;
  emissionDate: Date;
  assignorId: string;
};
