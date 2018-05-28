import { PresenceBase, PresenceOptions, PresenceMode, PresenceType } from './presence.comon';
export * from './presence.comon';
export declare class Presence extends PresenceBase {
    private _presence;
    priority: any;
    constructor(options?: PresenceOptions);
    readonly presence: any;
    type: PresenceType;
    mode: PresenceMode;
    status: string;
}
