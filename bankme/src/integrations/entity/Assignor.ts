import { IAssignor } from '../types/IAssignor';

export default class Assignor implements IAssignor {
  private _id: string;
  private _document: string;
  private _email: string;
  private _phone: string;
  private _name: string;

  constructor(
    id?: string,
    document?: string,
    email?: string,
    phone?: string,
    name?: string,
  ) {
    this.id = id;
    this.document = document;
    this.email = email;
    this.phone = phone;
    this.name = name;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get document(): string {
    return this._document;
  }

  set document(document: string) {
    this._document = document;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(phone: string) {
    this._phone = phone;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  toCreate() {
    return {
      document: this.document,
      email: this.email,
      phone: this.phone,
      name: this.name,
    };
  }

  toJSON() {
    return {
      id: this.id,
      document: this.document,
      email: this.email,
      phone: this.phone,
      name: this.name,
    };
  }
}
