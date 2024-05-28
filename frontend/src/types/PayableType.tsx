export type TPayable = {
  id: string,
  assignor: string,
  value: number,
  emissionDate: string,
}

export type TPayableRedux = {
  payablesReduce: TPayable
}

export type TPayableProps = {
  id: string,
  setId: (id: string) => void,
  value: number,
  setValue: (value: number) => void,
  assignor: string,
  setAssignor: (assignor: string) => void,
  emissionDate: string,
  setEmissionDate: (emissionDate: string) => void,
  handleSubmit: (payable: TPayable) => void,
  setError: (error: []) => void,
}