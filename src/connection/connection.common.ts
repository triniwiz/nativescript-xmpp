import { Observable } from 'tns-core-modules/data/observable';

export abstract class ConnectionBase extends Observable {
    _options: ConnectionOptions;
    connection: any;

    constructor(options: ConnectionOptions) {
        super();
        this._options = options;
    }

    abstract connect(): void;

    abstract disconnect(): void;

    abstract login(): void;

    abstract send(data): void;
}

export interface ConnectionOptions {
    username: string;
    password: string;
    domain: string;
    host?: string;
    port?: number;
    resource?: string;
    sasl?: Array<string>;
    compression: boolean;
}
