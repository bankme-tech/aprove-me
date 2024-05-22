export class CreateAssignorInputDTO {
  readonly document: string;
  readonly email: string;
  readonly phone: string;
  readonly name: string;

  constructor(document: string, email: string, phone: string, name: string) {
    this.document = document;
    this.email = email;
    this.phone = phone;
    this.name = name;
  }
}
