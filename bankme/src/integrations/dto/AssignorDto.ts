import Assignor from '../entity/Assignor';

export default class AssignorDto {
  id: string;
  document: string;
  email: string;
  password: string;
  phone: string;
  name: string;
  active: boolean;

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

  static fromEntity(assignor: Assignor): AssignorDto {
    const assignorDto = new AssignorDto();

    assignorDto.id = assignor.id;
    assignorDto.document = assignor.document;
    assignorDto.email = assignor.email;
    assignorDto.password = assignor.password;
    assignorDto.name = assignor.name;
    assignorDto.phone = assignor.phone;

    return assignorDto;
  }

  public toJSON() {
    return {
      document: this.document,
      email: this.email,
      phone: this.phone,
      name: this.name,
    };
  }
}
