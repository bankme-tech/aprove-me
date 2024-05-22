class Assignor {
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
    name: string,
  ) {
    this.id = id;
    this.document = document;
    this.email = email;
    this.phone = phone;
    this.name = name;
  }
}

export class CreatePayableOutputDTO {
  readonly id: string;
  readonly value: number;
  readonly emissionDate: Date;
  readonly assignor: Assignor;

  constructor(
    id: string,
    value: number,
    emissionDate: Date,
    assignorId: string,
    assignorDocument: string,
    assignorEmail: string,
    assignorPhone: string,
    assignorName: string,
  ) {
    this.id = id;
    this.value = value;
    this.emissionDate = emissionDate;

    this.assignor = new Assignor(
      assignorId,
      assignorDocument,
      assignorEmail,
      assignorPhone,
      assignorName,
    );
  }
}
