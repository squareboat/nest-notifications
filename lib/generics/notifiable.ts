export interface Notifiable {
  getFcmTokens?(): string | string[];
  getMailRecipients?(): string | string[];
}
