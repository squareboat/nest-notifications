import {
  NotificationChannel,
  NotificationReport,
  NotificationTemplate,
  Notifiable,
} from '../generics';
import { CloudMessaging } from '@squareboat/nest-firebase';

export class FcmChannel extends NotificationChannel {
  async send(
    notifiable: Notifiable,
    notification: NotificationTemplate,
  ): Promise<NotificationReport> {
    if (!('toPushNotification' in notification)) { return new NotificationReport(false); }
    const payload = await notification['toPushNotification']();
    const tokens = notifiable.getFcmTokens();
    if (!tokens.length || !Object.keys(payload).length)
      return new NotificationReport(false);

    if (Array.isArray(tokens)) payload.tokens = tokens;
    else payload.token = tokens;
    const report = await CloudMessaging.init().send(payload);
    return new NotificationReport(true);
  }
}
