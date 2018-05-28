export class PresenceBase {
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
