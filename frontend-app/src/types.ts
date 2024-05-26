export type Assignor = {
  id: string,
  name: string,
  document: string,
  email: string,
  phone: string,
}

export type Payable = {
  id: string,
  value: number,
  emissionDate: string,
  assignorId: string,
}