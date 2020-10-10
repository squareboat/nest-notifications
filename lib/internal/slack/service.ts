import { Injectable, Inject } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { WebClient } from '@slack/web-api';

import { SlackOptions } from './interfaces';
import { SEND_SLACK_MESSAGE, SLACK_OPTIONS, SLACK_QUEUE } from './constants';

@Injectable()
export class SlackService {
  private static options: SlackOptions;
  private static queueProvider: any;
  private static client: any;

  constructor(
    @Inject(SLACK_OPTIONS) private options: SlackOptions,
    @InjectQueue(SLACK_QUEUE) queueProvider: Queue
  ) {
    SlackService.options = options;
    SlackService.queueProvider = queueProvider;
    SlackService.client = new WebClient(options.token);
  }

  static getConfig(): SlackOptions {
    return SlackService.options;
  }

  static queue(options: Record<string, any>) {
    SlackService.queueProvider.add(SEND_SLACK_MESSAGE, options);
  }

  static async send(options: Record<string, any>) {
    await SlackService.client.chat.postMessage(options);
  }
}
