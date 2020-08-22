import { NotificationOptions } from './interfaces';

export class NotificationStorage {
  private static config: NotificationOptions;

  static addConfig(config: NotificationOptions) {
    NotificationStorage.config = config;
    return;
  }

  static getConfig(): NotificationOptions {
    return NotificationStorage.config;
  }
}
