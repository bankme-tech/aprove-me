import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsName } from '~/common/types/events';
import { NotificationSuccessPayableBatchEvent } from '../events/notification-success-payable-batch.event';

@Injectable()
export class NotificationSuccessPayableBatch {
  @OnEvent(NotificationsName.SUCCESS_PAYABLE_BATCH)
  async handle(event: NotificationSuccessPayableBatchEvent) {
    // TODO: Send notification to user
    console.log(event);
  }
}
