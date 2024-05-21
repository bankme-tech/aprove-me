import { CpfVO, EmailVO, PhoneVO, UniqueEntityIdVO } from "./common/value-object";
import { Entity } from "./entity";
import { CnpjVO } from "./common/value-object/cnpj.vo";
import { InvalidFieldError } from "./common/exception";

export type AssignorProps = {
  id?: string;
  document: string;
  email: string;
  phone: string;
  name: string;
}

export class AssignorEntity extends Entity {
  readonly id: UniqueEntityIdVO;
  readonly document: CpfVO | CnpjVO;
  readonly email: EmailVO;
  readonly phone: PhoneVO;
  readonly name: string;  

  constructor(props: AssignorProps){
    super();
    this.id = props.id ? new UniqueEntityIdVO(props.id) : new UniqueEntityIdVO();
    this.document = this.applyDocument(props.document);
    this.email = new EmailVO(props.email);
    this.phone = new PhoneVO(props.phone);
    this.name = props.name;
  }

  static create(props: Omit<AssignorProps, 'id'>): AssignorEntity {
    return new AssignorEntity(props);
  };

  toJSON() {
    return {
      id: this.id.value,
      document: this.document.value,
      email: this.email.value,
      phone: this.phone.value,
      name: this.name
    }
  }

  private applyDocument (value: string): CpfVO | CnpjVO {
    const cleanValue = value.replace(/\D/g, '');

    if (cleanValue.length === 11) return new CpfVO(cleanValue);
    if (cleanValue.length === 14) return new CnpjVO(cleanValue);

    throw new InvalidFieldError('document');
  }
};