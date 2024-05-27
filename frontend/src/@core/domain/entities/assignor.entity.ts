export class Assignor {
  public id: string;
  public document: string;
  public email: string;
  public phone: string;
  public name: string;

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
