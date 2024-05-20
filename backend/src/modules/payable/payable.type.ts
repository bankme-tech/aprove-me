type Assignor = {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
};

export type Payable = {
  id: string;
  value: number;
  emissionDate: Date;
  assignor: Assignor;
};
