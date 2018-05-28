import { MessageBase, MessageType } from '../message/message.common';
export * from '../message/message.common';
export declare class Message extends MessageBase {
    _options: any;
    constructor();
    to: string;
    body: any;
    type: MessageType;
    from: string;
}
