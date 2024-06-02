type RegisterAssignorInput = {
  document: string;
  email: string;
  phone: string;
  name: string;
};

export class AssignorDataBuilder {
  private props: RegisterAssignorInput = {
    document: '12345678900',
    email: 'example@example.com',
    phone: '123456789',
    name: 'John Doe',
  };

  public static anAssignor(): AssignorDataBuilder {
    return new AssignorDataBuilder();
  }

  public withDocument(document: string): this {
    this.props.document = document;
    return this;
  }

  public withEmail(email: string): this {
    this.props.email = email;
    return this;
  }

  public withPhone(phone: string): this {
    this.props.phone = phone;
    return this;
  }

  public withName(name: string): this {
    this.props.name = name;
    return this;
  }

  public build(): RegisterAssignorInput {
    return this.props;
  }
}
