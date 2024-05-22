import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsName } from '~/common/types/events';
import { NotificationFailurePayableBatchEvent } from '../events/notification-failure-payable-batch.event';

@Injectable()
export class NotificationSuccessPayableBatch {
  @OnEvent(NotificationsName.FAILURE_PAYABLE_BATCH)
  async handle(event: NotificationFailurePayableBatchEvent) {
    // TODO: Send notification to developer team
    console.log(event);
  }
}
