import { MessageBase } from './message.common';

export declare class Message extends MessageBase {
  to: string;
  from: string;
  body: any;
  type: string;
}
