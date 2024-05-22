export type receivableBodyDto = {
  value: number;
  emissionDate: Date;
  assignorId: string;
};

export type receivableResponseDto = {
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;
};

export type receivableListResponseDto = receivableResponseDto[];
