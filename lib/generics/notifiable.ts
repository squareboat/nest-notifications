export interface Notifiable {
  getFcmTokens?(): string | string[];
  getMailRecipients?(): string | string[];
  getSlackChannel?(): string;
}
