import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { MailmanOptions } from '@squareboat/nest-mailman/dist/interfaces';

export interface NotificationOptions {
  channels: {
    fcm?: {
      credentialsPath: string
    },
    mail?: MailmanOptions
  };
}

export interface NotificationAsyncOptionsFactory {
  createNotificationOptions():
    | Promise<NotificationOptions>
    | NotificationOptions;
}

export interface NotificationAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<NotificationOptions>;
  useClass?: Type<NotificationAsyncOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<NotificationOptions> | NotificationOptions;
  inject?: any[];
}
