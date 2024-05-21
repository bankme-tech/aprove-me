import { AssignorPersistence } from './assignor.types';

export interface PayablePersistence {
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;
  assignor?: AssignorPersistence;
}
