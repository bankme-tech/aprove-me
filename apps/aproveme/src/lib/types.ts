export type Payable = {
  id: string;
  value: number;
  emissionDate: string;
  assignorId: string;
};

export type Assignor = {
  id: string;
  email: string;
  phone: string;
  document: string;
  name: string;
};
