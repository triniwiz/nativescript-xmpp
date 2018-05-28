import { PresenceBase  } from './presence.comon';

export declare class Presence extends PresenceBase {
  type: PresenceType;
  mode: PresenceMode;
  status: string;
  presence: any;
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
