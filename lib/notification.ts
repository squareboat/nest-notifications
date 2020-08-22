import { Notifiable, NotificationTemplate } from './generics';

export class Notification {
  static async send(
    notifiable: Notifiable,
    template: NotificationTemplate,
  ): Promise<Record<string, any>> {
    template.setNotifiable(notifiable);
    const channels = template.channels();
    for (const channel of channels) {
      channel.handle(notifiable, template);
    }

    return {};
  }

  static async queue(
    notifiable: Notifiable,
    template: NotificationTemplate,
  ): Promise<Record<string, any>> {
    template.setNotifiable(notifiable);
    const channels = template.channels();
    for (const channel of channels) {
      channel.handle(notifiable, template);
    }

    return {};
  }
}
