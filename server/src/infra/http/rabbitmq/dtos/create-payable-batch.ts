export class CreatePayableBatchDto {
  payables: {
    value: number;
    emissionDate: string;
    assignorId: string;
  }[];
}
