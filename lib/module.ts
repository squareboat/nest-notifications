import { Module, DynamicModule, Provider, Type } from '@nestjs/common';
import {
  NotificationOptions,
  NotificationAsyncOptions,
  NotificationAsyncOptionsFactory,
} from './interfaces';
import { NOTIFICATION_OPTIONS } from './constants';
import { NotificationService } from './service';
import { FirebaseModule } from '@squareboat/nest-firebase';
import { MailmanModule } from '@squareboat/nest-mailman';
import { NotificationStorage } from './storage';

@Module({
  imports: [
    FirebaseModule.registerAsync({
      imports: [NotificationStorage],
      useFactory: (storage: NotificationStorage) => {
        const options = NotificationStorage.getConfig()
        return {
          credentialsPath: options.channels.fcm?.credentialsPath || '',
        }
      },
      inject: [NOTIFICATION_OPTIONS],
    }),
    MailmanModule.registerAsync({
      imports: [NotificationStorage],
      useFactory: (storage: NotificationStorage) => {
        const options = NotificationStorage.getConfig()
        return options.channels.mail || {
          host: '',
          port: '',
          username: '',
          password: '',
          from: '',
          path: ''
        };
      },
      inject: [NOTIFICATION_OPTIONS],
    })
  ],
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

    const inject = [
      (options.useClass || options.useExisting) as Type<NotificationOptions>,
    ];

    return {
      provide: NOTIFICATION_OPTIONS,
      useFactory: async (optionsFactory: NotificationAsyncOptionsFactory) =>
        await optionsFactory.createNotificationOptions(),
      inject,
    };
  }
}
