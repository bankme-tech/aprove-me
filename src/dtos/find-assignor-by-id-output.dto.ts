export class FindAssignorByIdOutputDTO {
  readonly id: string;
  readonly document: string;
  readonly email: string;
  readonly phone: string;
  readonly name: string;

  constructor(
    id: string,
    document: string,
    email: string,
    phone: string,
    name: string
  ) {
    this.id = id;
    this.document = document;
    this.email = email;
    this.phone = phone;
    this.name = name;
  }
}
