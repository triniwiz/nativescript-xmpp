import {
  XMPPBase,
  PresenceBase,
  PresenceType,
  PresenceMode,
  MessageBase
} from './xmpp.common';

export declare class XMPP extends XMPPBase {
  connection: any;
  send(data: any): void;
  connect(): void;
  disconnect(): void;
  login(): void;
}

export declare class Presence extends PresenceBase {
  type: PresenceType;
  mode: PresenceMode;
  status: string;
  presence: any;
}

export declare class Message extends MessageBase {
  to: string;
  from: string;
  body: any;
  type: string;
}
