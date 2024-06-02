import { Entity } from '@core/shared/model';
import { Notification } from '@core/shared/notification';
import { Document, Email, Name, Phone } from '@core/shared/value-objects';

export type AssignorProps = {
  id?: string;
  document: string;
  email: string;
  phone: string;
  name: string;
};

export class Assignor extends Entity<AssignorProps> {
  private _document: Document;
  private _email: Email;
  private _phone: Phone;
  private _name: Name;

  constructor(props: AssignorProps) {
    const notification = new Notification();
    super(props, notification);
    this._notification = notification;

    this._document = new Document(props.document, this._notification);
    this._email = new Email(props.email, this._notification);
    this._phone = new Phone(props.phone, this._notification);
    this._name = new Name(props.name, this._notification);
  }

  static create(props: AssignorProps): Assignor {
    return new Assignor(props);
  }

  public update(props: Partial<AssignorProps>): void {
    this._document = new Document(props.document, this._notification);
    this._email = new Email(props.email, this._notification);
    this._phone = new Phone(props.phone, this._notification);
    this._name = new Name(props.name, this._notification);
  }

  get id() {
    return this._id.getValue();
  }

  get document() {
    return this._document.getValue();
  }

  get email() {
    return this._email.getValue();
  }

  get phone() {
    return this._phone.getValue();
  }

  get name() {
    return this._name.getValue();
  }

  get notifications() {
    return this.getNotifications();
  }

  get containNotifications() {
    return this.hasNotifications();
  }
}
