import { IsDefined } from 'class-validator';

export class AuthEnv {
  @IsDefined()
  JWT_SECRET!: string;

  @IsDefined()
  JWT_EXPIRES_IN!: string;
}

declare global {
  export interface IEnv extends AuthEnv {}
}
