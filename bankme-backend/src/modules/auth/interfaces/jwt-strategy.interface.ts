// INTERFACES
import { IJWTToken } from './jwt-token.interface';

export interface IJWTStrategy {
	validate(payload: IJWTToken): Promise<IJWTToken>;
}
