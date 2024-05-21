import { IsDefined, IsOptional } from 'class-validator';

export class CoreEnv {
  @IsDefined()
  NODE_ENV!: string;

  @IsOptional()
  PORT?: string;
}

declare global {
  export interface IEnv extends CoreEnv {}
}
