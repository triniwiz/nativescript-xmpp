import { PresenceOptions, PresenceType, PresenceBase, PresenceMode } from './presence.comon';
export * from './presence.comon';
export declare class Presence extends PresenceBase {
    constructor(options?: PresenceOptions);
    type: PresenceType;
    mode: PresenceMode;
    status: string;
}
