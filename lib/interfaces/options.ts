import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface NotificationOptions {
  fcm: { serverKey: string };
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
