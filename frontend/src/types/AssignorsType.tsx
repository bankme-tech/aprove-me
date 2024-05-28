export type TAssignors = {
  id: string,
  document: string,
  email: string,
  phone: string,
  name: string
}

export type TAssignorsRedux = {
  assignorReduce: TAssignors,
}

export type TAssignorProps = {
  id: string,
  setId: (e: string) => void,
  document: string,
  setDocument: (e: string) => void,
  email: string,
  serEmail: (e: string) => void,
  phone: string,
  setPhone: (e: string) => void,
  name: string,
  setName: (e: string) => void,
  handleSubmit: (e: TAssignors) => void,
  setError: (e: string[]) => void
}