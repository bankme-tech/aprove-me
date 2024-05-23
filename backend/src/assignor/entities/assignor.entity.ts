interface AssignorParams {
  id?: string;
  name: string;
  document: string;
  email: string;
  phone: string;
}

export class Assignor {
  #id?: string;
  public document: string;
  public email: string;
  public name: string;
  public phone: string;

  constructor({ id, document, email, name, phone }: AssignorParams) {
    this.#id = id;
    this.document = this.normalizeDocument(document);
    this.email = email;
    this.name = name;
    this.phone = this.normalizePhone(phone);
  }

  get id() {
    return this.#id;
  }

  private normalizeDocument(document: string) {
    return document.replace(/\D/g, '');
  }

  private normalizePhone(phone: string) {
    return phone.replace(/\D/g, '');
  }
}
