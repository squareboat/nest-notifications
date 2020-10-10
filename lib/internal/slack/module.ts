import { Module, DynamicModule, Provider, Type } from '@nestjs/common';
import { SlackService } from './service';
import {
  SlackOptions,
  SlackAsyncOptions,
  SlackOptionsFactory,
} from './interfaces';
import { BullModule } from '@nestjs/bull';
import { SLACK_QUEUE, SLACK_OPTIONS } from './constants';
import { SlackConsumer } from './queue/consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: SLACK_QUEUE,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    }),
  ],
})
export class SlackModule {
  /**
   * Register options
   * @param options
   */
  static register(options: SlackOptions): DynamicModule {
    return {
      global: true,
      module: SlackModule,
      providers: [
        SlackService,
        SlackConsumer,
        {
          provide: SLACK_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  /**
   * Register Async Options
   */
  static registerAsync(options: SlackAsyncOptions): DynamicModule {
    return {
      global: true,
      module: SlackModule,
      providers: [
        SlackConsumer,
        SlackService,
        this.createStorageOptionsProvider(options),
      ],
    };
  }

  private static createStorageOptionsProvider(
    options: SlackAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: SLACK_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass || options.useExisting) as Type<SlackOptions>,
    ];

    return {
      provide: SLACK_OPTIONS,
      useFactory: async (optionsFactory: SlackOptionsFactory) =>
        await optionsFactory.createSlackOptions(),
      inject,
    };
  }
}
