import { SlackService } from './service';

export class SlackMessaging {

  private messageChannel: string | undefined;
  private messageOptions: Record<string, any> | undefined;

  to(channel: string): this {
    this.messageChannel = channel;
    return this;
  }

  options(options: Record<string, any> ): this {
    this.messageOptions = options;
    return this;
  }

  async send() {
    await SlackService.send({
      channel: this.messageChannel,
      ...this.messageOptions,
    });
  }

  queue() {
    SlackService.queue({
      channel: this.messageChannel,
      options: this.messageOptions,
    });
  }

  static init() {
    return new SlackMessaging();
  }
}
