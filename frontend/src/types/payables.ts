export interface Payable {
  _id: string;
  props: {
    value: number;
    assignorId: string;
    emissionDate: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  };
}

export interface FindAllPayables {
  skip: number;
  take: number;
}

export interface FindAllResponse {
  payables: Payable[];
  totalPayables: number;
  totalPages: number;
}
