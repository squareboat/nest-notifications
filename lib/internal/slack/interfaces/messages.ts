export interface MessageBasics {
  channel: string;
}

export interface MessageToken {
  token: string;
}

interface WithText {
  text: string;
}

interface WithAttachments {
  attachments: Record<string, any>;
}

interface WithBlocks{
  blocks: Record<string, any>;
}

// Atleast one of ['text', 'blocks', 'attachments' ] has to be defined in order to post message to slack
export type MessageOptions = WithText | WithBlocks | WithAttachments;
