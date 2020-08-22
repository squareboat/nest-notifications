import { NotificationReport } from './report';
import { NotificationTemplate } from './notification';
import { Notifiable } from './notifiable';
import { NotificationStorage } from '../storage';

export abstract class NotificationChannel {
  public static init<T extends NotificationChannel>(this: new () => T): T {
    return new this();
  }

  async handle(notifiable: Notifiable, notification: NotificationTemplate) {
    const report = await this.send(notifiable, notification);
    console.log(report);
  }

  getConfig(): Record<string, any> {
    return NotificationStorage.getConfig();
  }

  abstract async send(
    notifiable: Notifiable,
    notification: NotificationTemplate,
  ): Promise<NotificationReport>;
}
