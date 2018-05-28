import { Observable } from 'tns-core-modules/data/observable';
import { Connection } from 'nativescript-xmpp/connection';
import {
  Presence,
  PresenceType,
  PresenceMode
} from 'nativescript-xmpp/presence';
import { Message } from 'nativescript-xmpp/message';
import { isIOS } from 'tns-core-modules/platform';
declare const org, DDXMLElement;
export class HelloWorldModel extends Observable {
  public message: string;
  private connection: Connection;
  constructor() {
    super();
    this.connection = new Connection({
      username: 'showstopper',
      password: 'password',
      domain: 'localhost',
      host: isIOS ? 'localhost' : '10.0.2.2',
      resource: 'NativeScript'
    });
    this.connection.on('processSubscribe', (args: any) => {
      console.log('sub request');
      console.log(args.object.get('presence'));
    });
    this.connection.on('outgoingMessage', args => {});
    this.connection.on('incomingMessage', args => {
      console.log('Message');
      console.log(args.object.get('message'));
    });
    this.connection.on('connected', args => {
      this.connection.login();
    });
    this.connection.on('authenticated', (args: any) => {
      const presence = new Presence();
      presence.status = 'Android!!!';
      presence.mode = PresenceMode.DND;
      this.connection.send(presence);
      const msg = new Message();
      msg.to = 'triniwiz@localhost';
      msg.body = 'Android Yay!!!';
      msg.from = 'showstopper@localhost';
      msg.type = 'chat';
      this.connection.send(msg);
      setTimeout(() => {
        const p = new Presence();
        presence.status = 'Ok';
        presence.mode = PresenceMode.AWAY;
        this.connection.send(presence);
      }, 5000);
      setTimeout(() => {
        const m = new Message();
        m.to = 'triniwiz@localhost';
        m.body = '2!!!';
        m.from = 'showstopper@localhost';
        m.type = 'chat';
        this.connection.send(m);
      }, 3000);
    });
    this.connection.connect();
  }
}
