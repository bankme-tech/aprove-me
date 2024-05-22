import { UUID } from 'crypto';

export class AssignorEntity {
  public id: UUID;
  public document: string;
  public email: string;
  public phone: string;
  public name: string;

  constructor(
    id: UUID,
    document: string,
    email: string,
    phone: string,
    name: string,
  ) {
    this.id = id;
    this.document = document;
    this.email = email;
    this.phone = phone;
    this.name = name;
  }
}
