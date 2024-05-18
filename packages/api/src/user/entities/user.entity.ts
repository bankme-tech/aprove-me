export class User {
  id: string;
  login: string;
  password: string;

  constructor(id: string, login: string, password: string) {
    this.id = id;
    this.login = login;
    this.password = password;
  }
}
