import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
export abstract class XMPPBase extends Observable {
  _options: XMPPOptions;
  connection: any;
  constructor(options: XMPPOptions) {
    super();
    this._options = options;
  }
  abstract connect(): void;
  abstract disconnect(): void;
  abstract login(): void;
  abstract send(data): void;
}

export abstract class PresenceBase {
  presence: any;
  _options: PresenceOptions;
  constructor(
    options: PresenceOptions = {
      type: PresenceType.AVAILABLE,
      mode: PresenceMode.AVAILABLE
    }
  ) {
    this._options = options;
  }
}

export interface PresenceOptions {
  to?: string;
  type?: PresenceType;
  status?: string;
  priority?: number;
  mode?: PresenceMode;
}

export enum PresenceType {
  AVAILABLE = 'available',
  ERROR = 'error',
  PROBE = 'probe',
  SUBSCRIBE = 'subscribe',
  SUBSCRIBED = 'subscribed',
  UNAVAILABLE = 'unavailable',
  UNSUBSCRIBE = 'unsubscribe',
  UNSUBSCRIBED = 'unsubscribed'
}

export enum PresenceMode {
  AWAY = 'away',
  CHAT = 'chat',
  DND = 'dnd',
  AVAILABLE = 'available',
  XA = 'xa'
}

export interface XMPPOptions {
  username: string;
  password: string;
  domain: string;
  host?: string;
  port?: number;
  resource?: string;
}
