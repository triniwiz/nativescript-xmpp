import { ConnectionBase, ConnectionOptions } from './connection.common';
export declare class Connection extends ConnectionBase {
    private manager;
    constructor(options: ConnectionOptions);
    connect(): void;
    disconnect(): void;
    login(): void;
    send(data: any): void;
}
