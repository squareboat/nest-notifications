import { Module, DynamicModule, Provider } from '@nestjs/common';
import {
  NotificationOptions,
  NotificationAsyncOptions,
  NotificationAsyncOptionsFactory,
} from './interfaces';
import { NOTIFICATION_OPTIONS } from './constants';
import { NotificationService } from './service';
import { FirebaseModule } from 'libs/firebase/src';

@Module({
  imports: [FirebaseModule],
})
export class NotificationModule {
  /**
   * Register options
   * @param options
   */
  static register(options: NotificationOptions): DynamicModule {
    return {
      global: true,
      module: NotificationModule,
      providers: [
        NotificationService,
        {
          provide: NOTIFICATION_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  /**
   * Register Async Options
   */
  static registerAsync(options: NotificationAsyncOptions): DynamicModule {
    return {
      global: true,
      module: NotificationModule,
      providers: [
        this.createStorageOptionsProvider(options),
        NotificationService,
      ],
    };
  }

  private static createStorageOptionsProvider(
    options: NotificationAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NOTIFICATION_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: NOTIFICATION_OPTIONS,
      useFactory: async (optionsFactory: NotificationAsyncOptionsFactory) =>
        await optionsFactory.createNotificationOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
