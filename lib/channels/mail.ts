import {
  NotificationChannel,
  NotificationReport,
  NotificationTemplate,
  Notifiable,
} from '../generics';
import { Mailman } from '@squareboat/nest-mailman';

export class MailChannel extends NotificationChannel {
  async send(
    notifiable: Notifiable,
    notification: NotificationTemplate
  ): Promise<NotificationReport> {
    if (!('toMail' in notification)) {
      return new NotificationReport(false);
    }

    const mailRecipients = notifiable.getMailRecipients();
    const notificationData = await notification['toMail']();
    const { subject, payload, view } = notificationData;
    if (!view) return new NotificationReport(false);

    try {
      await Mailman.init()
        .to(mailRecipients)
        .subject(subject)
        .view(view, payload)
        .send();

      return new NotificationReport(true);
    } catch (err) {
      return new NotificationReport(false);
    }
  }
}
