export class User {
  public id: string;
  public login: string;
  public password: string;

  constructor(id: string, login: string, password: string) {
    this.id = id;
    this.login = login;
    this.password = password;
  }
}
