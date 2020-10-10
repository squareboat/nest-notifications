import {
  NotificationChannel,
  NotificationReport,
  NotificationTemplate,
  Notifiable,
} from '../generics';
import { MessageOptions, SlackMessaging } from '../internal/slack';

export class SlackChannel extends NotificationChannel {
  async send(
    notifiable: Notifiable,
    notification: NotificationTemplate
  ): Promise<NotificationReport> {

    if (!('toSlack' in notification)) {
      return new NotificationReport(false);
    }

    const slackChannel = notifiable.getSlackChannel!();
    const notificationData = await notification['toSlack']();
    if (!slackChannel) return new NotificationReport(false);

    try {
      await SlackMessaging.init()
        .to(slackChannel)
        .options(<MessageOptions>notificationData)
        .send();

      return new NotificationReport(true);
    } catch (err) {
      return new NotificationReport(false);
    }
  }
}
