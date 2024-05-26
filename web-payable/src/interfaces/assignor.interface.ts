export interface AssignorDto {
  /** É o documento CPF ou CNPJ do cedente */
  document: string;
  /** É o email do cedente */
  email: string;
  /** É o telefone do cedente */
  phone: string;
  /** É a nome ou razão social do cedente */
  name: string;
}

export interface AssignorEntity extends AssignorDto {
  id: string;
}
