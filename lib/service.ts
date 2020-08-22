import { NotificationOptions } from './interfaces';
import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_OPTIONS } from './constants';
import { NotificationStorage } from './storage';

@Injectable()
export class NotificationService {
  constructor(@Inject(NOTIFICATION_OPTIONS) config: NotificationOptions) {
    NotificationStorage.addConfig(config);
  }
}
