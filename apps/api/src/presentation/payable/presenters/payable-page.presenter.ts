import { PayablePresenter } from '@presentation/payable/presenters/payable.presenter';
import { PagePresenter } from '@presentation/shared/presenters/page.presenter';

export class PayablePagePresenter extends PagePresenter(PayablePresenter) {}
