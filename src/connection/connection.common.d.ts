import { Observable } from 'tns-core-modules/data/observable';
export declare abstract class ConnectionBase extends Observable {
    _options: ConnectionOptions;
    connection: any;
    constructor(options: ConnectionOptions);
    abstract connect(): void;
    abstract disconnect(): void;
    abstract login(): void;
    abstract send(data: any): void;
}
export interface ConnectionOptions {
    username: string;
    password: string;
    domain: string;
    host?: string;
    port?: number;
    resource?: string;
}
