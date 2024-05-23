import { AssignorClient } from './assignor-client';
import { AuthClient } from './auth-client';

export class BankmeClient {
  auth = new AuthClient();

  assignors = new AssignorClient();
}
