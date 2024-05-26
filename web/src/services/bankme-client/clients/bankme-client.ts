/* eslint-disable no-underscore-dangle */
import type { AssignorsClient } from './assignors-client';
import type { AuthClient } from './auth-client';
import type { PayablesClient } from './payables-client';
import type { UsersClient } from './users-client';

interface Props {
  auth?: AuthClient;
  assignors?: AssignorsClient;
  payables?: PayablesClient;
  users?: UsersClient;
}

export class BankmeClient {
  public auth: AuthClient;

  public assignors: AssignorsClient;

  public payables: PayablesClient;

  public users: UsersClient;

  constructor(props: Props) {
    const _props = props as Required<Props>;
    this.auth = _props.auth;
    this.assignors = _props.assignors;
    this.payables = _props.payables;
    this.users = _props.users;
  }
}
