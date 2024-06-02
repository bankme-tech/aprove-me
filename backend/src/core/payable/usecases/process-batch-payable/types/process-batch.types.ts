export type PayableInput = {
  value: number;
  assignor: string;
  attemptsMade?: number;
};

export type ProcessBatchPayableInput = {
  payables: PayableInput[];
};

export type ProcessSinglePayableInput = {
  value: number;
  assignor: string;
  attemptsMade: number;
};
