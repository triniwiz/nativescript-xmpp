export declare class PresenceBase {
    presence: any;
    _options: PresenceOptions;
    constructor(options?: PresenceOptions);
}
export interface PresenceOptions {
    to?: string;
    type?: PresenceType;
    status?: string;
    priority?: number;
    mode?: PresenceMode;
}
export declare enum PresenceType {
    AVAILABLE = "available",
    ERROR = "error",
    PROBE = "probe",
    SUBSCRIBE = "subscribe",
    SUBSCRIBED = "subscribed",
    UNAVAILABLE = "unavailable",
    UNSUBSCRIBE = "unsubscribe",
    UNSUBSCRIBED = "unsubscribed"
}
export declare enum PresenceMode {
    AWAY = "away",
    CHAT = "chat",
    DND = "dnd",
    AVAILABLE = "available",
    XA = "xa"
}
