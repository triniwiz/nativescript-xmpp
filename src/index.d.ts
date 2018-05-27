import {
  XMPPBase,
  PresenceBase,
  PresenceType,
  PresenceMode
} from './xmpp.common';

export declare class XMPP extends XMPPBase {
  send(data: any): void;
  connect(): void;
  disconnect(): void;
  login(): void;
}

export declare class Presence extends PresenceBase {
  type: PresenceType;
  mode: PresenceMode;
  status: string;
}
