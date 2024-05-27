export type TPayable = {
  id: string,
  assignor: string,
  value: string,
  emissionDate: string,
}

export type TPayableProps = {
  id: string,
  setId: (id: string) => void,
  value: string,
  setValue: (value: string) => void,
  assignor: string,
  setAssignor: (assignor: string) => void,
  emissionDate: string,
  setEmissionDate: (emissionDate: string) => void,
  handleSubmit: (payable: TPayable) => void,
}