import { ConnectionBase } from './connection.common';

export declare class Connection extends ConnectionBase {
  connection: any;
  send(data: any): void;
  connect(): void;
  disconnect(): void;
  login(): void;
}
