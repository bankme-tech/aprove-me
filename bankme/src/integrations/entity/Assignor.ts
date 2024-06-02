export default class Assignor {
  private _id: string;
  private _document: string;
  private _email: string;
  private _password: string;
  private _phone: string;
  private _name: string;
  private _active: boolean;

  constructor(
    id?: string,
    document?: string,
    email?: string,
    password?: string,
    phone?: string,
    name?: string,
    active?: boolean,
  ) {
    this.id = id;
    this.document = document;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.name = name;
    this.active = active;
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

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
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

  get active(): boolean {
    return this._active;
  }

  set active(active: boolean) {
    this._active = active;
  }

  toCreate() {
    return {
      document: this.document,
      email: this.email,
      password: this.password,
      phone: this.phone,
      name: this.name,
    };
  }
}
