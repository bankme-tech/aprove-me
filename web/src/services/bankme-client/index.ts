import { AssignorClient } from './assignor-client';
import { AuthClient } from './auth-client';
import { PayablesClient } from './payables-client';

export class BankmeClient {
  auth = new AuthClient();

  assignors = new AssignorClient();

  payables = new PayablesClient();
}
