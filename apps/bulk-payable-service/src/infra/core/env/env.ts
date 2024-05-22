import { IsDefined } from 'class-validator';

export class CoreEnv {
  @IsDefined()
  REDIS_HOST!: string;

  @IsDefined()
  REDIS_PORT!: number;
}

declare global {
  export interface IEnv extends CoreEnv {}
}
