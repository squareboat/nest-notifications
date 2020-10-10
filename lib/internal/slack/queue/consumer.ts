import { Job } from 'bull';
import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { SLACK_QUEUE, SEND_SLACK_MESSAGE } from '../constants';
import { SlackService } from '../service';

@Injectable()
@Processor(SLACK_QUEUE)
export class SlackConsumer {
  @OnQueueActive()
  onActive(job: Job) {
    console.log(`🧑‍🏭   ${SLACK_QUEUE} [${job.id}] :::: 📧 Processing `);
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    console.log(`🧑‍🏭   ${SLACK_QUEUE} [${job.id}] :::: 📧 Processed`);
  }

  @Process(SEND_SLACK_MESSAGE)
  async sendMessage(job: Job<any>): Promise<any> {
    try {
      await SlackService.send(job['data']);
      return true;
    } catch(Err) {
      return false;
    }
  }
}
