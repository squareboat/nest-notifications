export class NotificationReport {
  constructor(private success: boolean) {}

  isSuccess(): boolean {
    return this.success;
  }
}
