export class Payable {
  id: string;
  value: number;
  emissionDate: Date;
  assignor: string;
}

export class Assignor {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
}
