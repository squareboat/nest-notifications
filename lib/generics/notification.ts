import { NotificationChannel } from './channel';
import { Notifiable } from './notifiable';

export abstract class NotificationTemplate {
  private notifiable: Notifiable;
  private payload: Record<string, any>;

  setNotifiable(notifiable: Notifiable): this {
    this.notifiable = notifiable;
    return this;
  }

  setPayload(payload: Record<string, any>): this {
    this.payload = payload;
    return this;
  }

  getPayload(): Record<string, any> {
    return this.payload;
  }

  getNotifiable(): Notifiable {
    return this.notifiable;
  }

  public abstract channels(): NotificationChannel[];
}
