export class MessageBase {
  message: any;
}

export enum MessageType {
  NORMAL = 'normal',
  CHAT = 'chat',
  GROUP_CHAT = 'groupchat',
  HEADLINE = 'headline',
  ERROR = 'error'
}
