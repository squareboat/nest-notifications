import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface SlackOptions {
  token: string;
}

export interface SlackOptionsFactory {
  createSlackOptions(): Promise<SlackOptions> | SlackOptions;
}

export interface SlackAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<SlackOptions>;
  useClass?: Type<SlackOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<SlackOptions> | SlackOptions;
  inject?: any[];
}
