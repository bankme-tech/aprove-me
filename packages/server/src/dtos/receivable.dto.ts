export type receivableBodyDto = {
  value: number;
  emissionDate: string;
  assignorId: string;
};

export type receivableResponseDto = {
  id: string;
  value: number;
  emissionDate: string;
  assignorId: string;
};

export type receivableListResponseDto = receivableResponseDto[];
